import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function NowPlayingScreen() {
  const { title, url, artist, cover } = useLocalSearchParams();
  const router = useRouter();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  const loadNewAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    if (url) {
      try {
        setIsLoading(true);
        const audioUrl = Array.isArray(url) ? url[0] : url;
        const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
        setSound(newSound);

        await newSound.playAsync();
        setIsPlaying(true);

        const status = await newSound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis || 1);
        }

        setCurrentPosition(0);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'audio :', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  loadNewAudio();

  return () => {
    // Nettoyage lors du démontage du composant
    const unloadAudio = async () => {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          await sound.stopAsync();
          await sound.unloadAsync();
        }
      }
    };
    unloadAudio();
  };
}, [url]);


  useEffect(() => {
    let interval: NodeJS.Timeout; // Définit explicitement le type de interval
  
    if (isPlaying && sound) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setCurrentPosition(status.positionMillis);
          setDuration(status.durationMillis || 1);
        }
      }, 1000);
    }
  
    return () => {
      clearInterval(interval); // Assurez-vous de nettoyer l'intervalle
    };
  }, [isPlaying, sound]);
  

  const playPauseAudio = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Erreur de lecture audio :', error);
    }
  };

  const closeModal = () => {
    router.back(); 
  };

  const seekForward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.min(status.positionMillis + 10000, status.durationMillis || 0);
        await sound.setPositionAsync(newPosition);
        setCurrentPosition(newPosition);
      }
    }
  };

  const seekBackward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        const newPosition = Math.max(status.positionMillis - 10000, 0);
        await sound.setPositionAsync(newPosition);
        setCurrentPosition(newPosition);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff4081" />
        <Text style={styles.loadingMessage}>Chargement de l'audio...</Text>
      </View>
    );
  }

  if (!url || !title) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>URL ou titre introuvable. Veuillez réessayer.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <FontAwesome name="close" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.nowPlaying}>
        {isPlaying ? 'Lecture en cours' : 'Audio en pause'}
      </Text>
      <Image
        source={{ uri: 'https://cdn.pixabay.com/photo/2023/06/19/14/24/travel-8074609_1280.png' }}
        style={styles.cover}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={currentPosition / duration}
        minimumTrackTintColor="#ff4081"
        maximumTrackTintColor="#aaa"
        thumbTintColor="#ff4081"
        onSlidingComplete={async (value) => {
          if (sound) {
            const newPosition = value * duration;
            await sound.setPositionAsync(newPosition);
            setCurrentPosition(newPosition);
          }
        }}
      />

      <Text style={styles.time}>
        {formatTime(currentPosition)} / {formatTime(duration)}
      </Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={seekBackward}>
          <FontAwesome name="backward" size={30} color="#ff4081" />
        </TouchableOpacity>
        <TouchableOpacity onPress={playPauseAudio}>
          <FontAwesome
            name={isPlaying ? 'pause' : 'play'}
            size={30}
            color="#ff4081"
            style={styles.playPause}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={seekForward}>
          <FontAwesome name="forward" size={30} color="#ff4081" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  nowPlaying: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  cover: {
    width: 300,
    height: 300,
    borderRadius: 75,
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  artist: {
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  time: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  slider: {
    width: '90%',
    height: 40,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
  },
  playPause: {
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingMessage: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  error: {
    color: '#ff4081',
    fontSize: 18,
    textAlign: 'center',
  },
});
