import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import HeaderWithBackButton from '@/components/HeaderWithBackButton';
import prophetData from '@/constants/prophetData';
import { useRouter } from 'expo-router';

export default function Prophets() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2023/06/19/14/24/travel-8074609_1280.png' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <HeaderWithBackButton title="Histoire des Prophètes" fallbackRoute="/" />
        <FlatList
          data={prophetData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.prophetItem}
              onPress={() => router.push(`/audioList/${item.id}`)}
            >
              {/* Numbering */}
              <View style={styles.numberContainer}>
                <Text style={styles.number}>{index + 1}</Text>
              </View>
              {/* Story Icon */}
              <FontAwesome name="book" size={24} color="#ff4081" style={styles.icon} />
              {/* Name */}
              <Text style={styles.prophetName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ajuste l'image pour couvrir tout l'écran
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Superposition semi-transparente pour améliorer la lisibilité
    padding: 10, // Ajoute un peu d'espacement interne
  },
  listContent: {
    padding: 10,
  },
  prophetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  numberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff4081',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  number: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 15,
  },
  prophetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
