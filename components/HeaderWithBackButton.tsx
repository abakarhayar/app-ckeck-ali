import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';

interface HeaderWithBackButtonProps {
  title: string;
  fallbackRoute?: "/" | "/prophets" | `/audioList/${string}`; // Types spécifiques
}

export default function HeaderWithBackButton({ title, fallbackRoute = "/prophets" }: HeaderWithBackButtonProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* Bouton de retour */}
        <Link href={fallbackRoute} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </Link>

        {/* Titre de la page */}
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ff4081',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
