import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2023/06/19/14/24/travel-8074609_1280.png' }}
      style={styles.background}
      imageStyle={styles.image}
    >
      <View style={styles.overlay}>
        {children} {/* Contenu des pages */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Assure le contenu centré verticalement
  },
  image: {
    resizeMode: 'cover', // L'image couvrira toute la surface
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Superposition légère pour rendre le contenu lisible
    padding: 20,
  },
});
