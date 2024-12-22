import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2023/06/19/14/24/travel-8074609_1280.png' }}
      style={styles.background}
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // S'adapte à la taille de l'écran
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Superposition semi-transparente
    padding: 10, // Ajoute un peu d'espace
  },
});
