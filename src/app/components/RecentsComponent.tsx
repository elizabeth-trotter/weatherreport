import React, { useEffect, useState } from 'react';
import { getRecentLocalStorage, removeRecentFromLocalStorage } from '../utils/LocalStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const RecentsComponent = ({ onRecentCityClick }: { onRecentCityClick: (location: string) => void }) => {
    const [recentsArray, setRecentsArray] = useState(getRecentLocalStorage());

    const removeRecent = (locationToRemove: string) => {
        removeRecentFromLocalStorage(locationToRemove);
        const updatedRecents = getRecentLocalStorage();
        setRecentsArray(updatedRecents);
    };

    useEffect(() => {
        const updatedRecents = getRecentLocalStorage();
        setRecentsArray(updatedRecents);
    });

    return (
        <div className='px-2'>
            {recentsArray.length > 0 ? (
                recentsArray.map((location: string, index: number) => (
                    <div key={index} className={`flex items-center justify-between py-4 ${index === recentsArray.length - 1 ? '' : 'mb-1 border-b border-gray-700'} `}>
                        <p className="font-oswald font-light text-lg cursor-pointer hover:text-peach" onClick={() => onRecentCityClick(location)}>
                            {location}
                        </p>
                        <FontAwesomeIcon icon={faMinusCircle} className="cursor-pointer text-xl text-white hover:text-peach" onClick={() => removeRecent(location)}/>
                    </div>
                ))
            ) : (
                <div className="text-center py-3">
                    <p className="font-oswald font-light text-xl pb-5">No recent searches</p>
                </div>
            )}
        </div>
    );
}

export default RecentsComponent;
