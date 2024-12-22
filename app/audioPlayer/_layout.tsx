import { Stack } from 'expo-router';
import { FavoritesProvider } from '@/components/context/FavoritesContext';

export default function Layout() {
  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Écran modal pour la lecture audio */}
        <Stack.Screen
          name="NowPlayingScreen" // Assurez-vous que le chemin est correct
          options={{
            presentation: 'modal', // Définit cet écran comme modal
            title: 'Lecture Audio',
          }}
        />
      </Stack>
    </FavoritesProvider>
  );
}
