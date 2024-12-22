import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

// Types
interface Prophet {
  id: string;
  name: string;
}

interface ProphetListProps {
  prophets: Prophet[];
}

export default function ProphetList({ prophets }: ProphetListProps) {
  const router = useRouter();

  return (
    <FlatList
      data={prophets}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.push(`./audioList/${item.id}` as const)} // Correction
        >
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  name: { fontSize: 18, color: '#333' },
});
