import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Audio {
  id: number;
  title: string;
  cover?: string;
  duration?: string;
}

interface AudioListProps {
  audios: Audio[];
}

export default function AudioList({ audios }: AudioListProps) {
  return (
    <FlatList
      data={audios}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.audioItem}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity>
            <FontAwesome name="play" size={20} color="#ff4081" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  audioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
});
