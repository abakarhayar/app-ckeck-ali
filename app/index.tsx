import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import VideoPlayer from '@/components/VideoPlayer';
import BackgroundWrapper from '@/components/BackgroundWrapper';

export default function Home() {
  return (
    <BackgroundWrapper>
      <View style={styles.overlay}>
        <Text style={styles.title}>Bienvenue dans l'Application de Ckeick Ali</Text>
        <VideoPlayer />
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Superposition semi-transparente pour améliorer la lisibilité
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Assurez-vous que le texte est lisible sur l'image
    marginBottom: 20,
  },
});
