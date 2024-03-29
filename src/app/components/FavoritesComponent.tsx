import React, { useState } from 'react'
import { getFavoriteLocalStorage, removeFavoriteFromLocalStorage } from '../utils/LocalStorage';

const FavoritesComponent = () => {
    const [favoritesArray, setFavoritesArray] = useState<string[]>([]);

    const removeFavorite = (locationToRemove: string) => {
        removeFavoriteFromLocalStorage(locationToRemove);
        const updatedFavorites = getFavoriteLocalStorage();
        setFavoritesArray(updatedFavorites);
    };

    return (
        <div>

        </div>
    )
}

export default FavoritesComponent
