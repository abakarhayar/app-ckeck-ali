import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFavorites } from '@/components/context/FavoritesContext';
import { useRouter } from 'expo-router';

const FavoritesScreen = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const router = useRouter();

    // Transformer les favoris en tableau
    const favoriteItems = Object.values(favorites);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes Favoris</Text>
            <FlatList
                data={favoriteItems}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <View style={styles.favoriteItem}>
                        {/* Détails de l'audio */}
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: '/audioPlayer/NowPlayingScreen',
                                    params: {
                                        title: item.title,
                                        url: item.url,
                                        cover: item.cover,
                                    },
                                })
                            }
                            style={styles.audioContent}
                        >
                            <Image
                                source={{ uri: item.cover || 'https://example.com/default-cover.jpg' }}
                                style={styles.cover}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.audioTitle}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Bouton de suppression */}
                        <TouchableOpacity onPress={() => toggleFavorite(item)}>
                            <Text style={styles.removeButton}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    favoriteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    audioContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cover: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    audioTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    audioArtist: {
        fontSize: 14,
        color: '#666',
    },
    removeButton: {
        color: 'red',
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default FavoritesScreen;
