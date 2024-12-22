import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { FavoritesProvider } from '@/components/context/FavoritesContext';
import { FontAwesome5 } from '@expo/vector-icons';
export default function Layout() {
  return (
    <FavoritesProvider>
      <Tabs screenOptions={{ tabBarActiveTintColor: '#ff4081', headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="prophets"
          options={{
            title: 'Prophètes',
            tabBarIcon: ({ color, size }) => <FontAwesome name="book" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="haj"
          options={{
            title: 'Hajj',
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="kaaba" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="zakat"
          options={{
            title: 'Zakat',
            tabBarIcon: ({ color, size }) => <FontAwesome name="money" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="heritage"
          options={{
            title: 'Héritage',
            tabBarIcon: ({ color, size }) => <FontAwesome name="balance-scale" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="+not-found"
          options={{
            href: null,
            title: '+not-found',
            tabBarIcon: ({ color, size }) => <FontAwesome name="balance-scale" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="audioList/[id]"
          options={{
            href: null,
            title: 'audioList/[id]',
            tabBarIcon: ({ color, size }) => <FontAwesome name="balance-scale" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color, size }) => <FontAwesome name="star" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="audioPlayer"
          options={{
            href: null,
            title: 'Favorites',
            tabBarIcon: ({ color, size }) => <FontAwesome name="star" size={size} color={color} />,
          }}
        />
      </Tabs>
    </FavoritesProvider>
  );
}
