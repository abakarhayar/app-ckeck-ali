import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Share } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HeaderWithBackButton from '@/components/HeaderWithBackButton';
import prophetData from '@/constants/prophetData';
import { useFavorites } from '@/components/context/FavoritesContext';
import BackgroundWrapper from '@/components/BackgroundWrapper'; 
interface AudioItem {
  title: string;
  url: string;
  cover: string;
  duration: string;
}

export default function AudioList() {
  const { id } = useLocalSearchParams();
  const prophet = prophetData.find((item) => item.id === id);
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();

  const handleShare = async (item: AudioItem) => {
    try {
      await Share.share({
        message: `Écoutez cet audio : ${item.title}\n${item.url}`,
      });
    } catch (error) {
      console.error('Erreur lors du partage :', error);
    }
  };

  if (!prophet || !prophet.audios) {
    return (
      <BackgroundWrapper>
        <HeaderWithBackButton title="Audios" fallbackRoute="/prophets" />
        <Text style={styles.error}>Aucun audio disponible pour ce prophète.</Text>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <HeaderWithBackButton title={`Histoire de ${prophet.name}`} fallbackRoute="/prophets" />
      <FlatList
        data={prophet.audios}
        keyExtractor={(item) => item.title}
        renderItem={({ item }: { item: AudioItem }) => {
          const isFavorite = !!favorites[item.title];
          const imageUrl = item.cover || 'https://example.com/default-cover.jpg';

          return (
            <View style={styles.audioItem}>
              <View style={styles.textContainer}>
                <Text style={styles.audioTitle}>{item.title}</Text>
                <Text style={styles.audioDuration}>{item.duration}</Text>
              </View>

              <View style={styles.iconContainer}>
                {/* Bouton favori */}
                <TouchableOpacity
                  onPress={() =>
                    toggleFavorite({
                      title: item.title,
                      url: item.url,
                      cover: imageUrl,
                      duration: item.duration,
                    })
                  }
                  style={styles.iconButton}
                >
                  <FontAwesome
                    name={isFavorite ? 'star' : 'star-o'}
                    size={24}
                    color="#ffd700"
                  />
                </TouchableOpacity>

                {/* Bouton partage */}
                <TouchableOpacity
                  onPress={() => handleShare(item)}
                  style={styles.iconButton}
                >
                  <FontAwesome name="share-alt" size={24} color="#4CAF50" />
                </TouchableOpacity>

                {/* Bouton lecture */}
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() =>
                    router.push({
                      pathname: '/audioPlayer/NowPlayingScreen',
                      params: {
                        title: item.title,
                        url: item.url,
                        artist: prophet.name,
                        cover: imageUrl,
                      },
                    })
                  }
                >
                  <FontAwesome name="play" size={24} color="#FF4081" />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.listContent}
      />
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  listContent: {
    padding: 10,
  },
  audioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  audioDuration: {
    fontSize: 14,
    color: '#666',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
