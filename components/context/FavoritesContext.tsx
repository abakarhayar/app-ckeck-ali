import React, { createContext, useContext, useState } from 'react';

// Type du contexte
type AudioDetails = {
    title: string;
    url: string;
    cover?: string;
    duration?: string;
};

type FavoritesContextType = {
    favorites: Record<string, AudioDetails>; // Les favoris stockent les détails de l'audio
    toggleFavorite: (audio: AudioDetails) => void; // Ajouter ou retirer un favori
};

// Création du contexte
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

// Fournisseur pour encapsuler les composants
export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Record<string, AudioDetails>>({});

    const toggleFavorite = (audio: AudioDetails) => {
        setFavorites((prev) => {
            const exists = !!prev[audio.title];
            const updatedFavorites = { ...prev };
            if (exists) {
                delete updatedFavorites[audio.title]; // Retirer des favoris
            } else {
                updatedFavorites[audio.title] = audio; // Ajouter aux favoris
            }
            return updatedFavorites;
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
