import React from 'react';
import { StyleSheet, View } from 'react-native';
import AudioList from '@/components/AudioList';
import audioData from '@/constants/audioData';

export default function Heritage() {
  return (
    <View style={styles.container}>
      <AudioList audios={audioData.heritage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
});
