import React from 'react';
import { Video, ResizeMode } from 'expo-av'; 
import { StyleSheet, View } from 'react-native';

export default function VideoPlayer() {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: '' }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN} 
        shouldPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', height: 300, padding: 40,  },
  video: { flex: 1 },
  
});
