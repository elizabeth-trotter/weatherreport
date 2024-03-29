import React, { useEffect, useState } from 'react'
import { getFavoriteLocalStorage, removeFavoriteFromLocalStorage } from '../utils/LocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const FavoritesComponent = ({ onRecentCityClick }: { onRecentCityClick: (location: string) => void }) => {
    const [favoritesArray, setFavoritesArray] = useState<string[]>([]);

    const removeFavorite = (locationToRemove: string) => {
        removeFavoriteFromLocalStorage(locationToRemove);
        const updatedFavorites = getFavoriteLocalStorage();
        setFavoritesArray(updatedFavorites);
    };

    useEffect(() => {
        const updatedFavorites = getFavoriteLocalStorage();
        setFavoritesArray(updatedFavorites);
    });

    return (
        <div className='px-2'>
            {favoritesArray.length > 0 ? (
                favoritesArray.map((location: string, index: number) => (
                    <div key={index} className={`flex items-center justify-between py-4 ${index === favoritesArray.length - 1 ? '' : 'mb-1 border-b border-gray-700'} `}>
                        <p className="font-oswald font-light text-lg cursor-pointer hover:text-peach" onClick={() => onRecentCityClick(location)}>
                            {location}
                        </p>
                        <FontAwesomeIcon icon={faMinusCircle} className="cursor-pointer text-xl text-white hover:text-peach" onClick={() => removeFavorite(location)}/>
                    </div>
                ))
            ) : (
                <div className="text-center py-7">
                    <p className="font-oswald font-light text-xl pb-10">No favorites saved</p>
                    <p className="font-oswald font-light text-xl pb-5">Add a city by clicking the heart</p>
                </div>
            )}
        </div>
    )
}

export default FavoritesComponent
