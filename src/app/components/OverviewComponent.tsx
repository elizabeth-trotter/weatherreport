import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart, faMagnifyingGlass, faSun } from "@fortawesome/free-solid-svg-icons";
import { IOverview } from '@/Interfaces/Interfaces';
import { getFavoriteLocalStorage, removeFavoriteFromLocalStorage, saveFavoriteToLocalStorage } from '../utils/LocalStorage';


const OverviewComponent = (props: IOverview) => {
    const [heartIcon, setHeartIcon] = useState<any>();

    const handleClickHeart = () => {
        const favorites = getFavoriteLocalStorage();

        if (favorites.includes(`${props.city}, ${props.state}`)) {
            removeFavoriteFromLocalStorage(`${props.city}, ${props.state}`);
            setHeartIcon(faHeart);
        } else {
            saveFavoriteToLocalStorage(`${props.city}, ${props.state}`);
            setHeartIcon(faSolidHeart);
        }
    };

    useEffect(() => {
        const favorites = getFavoriteLocalStorage();
        if (favorites.includes(`${props.city}, ${props.state}`)) {
            setHeartIcon(faSolidHeart);
        } else {
            setHeartIcon(faHeart);
        }
    });

    return (
        <div className='pt-20 ps-0 md:ps-2 w-full lg:w-1/2'>
            <div className='bg-navyblue flex justify-between items-center rounded-t-md h-14 p-4'>
                <h2 className='font-montserrat font-semibold text-2xl'>{props.city}, {props.state}</h2>
                <button onClick={handleClickHeart} className='hover:text-peach'>
                    <FontAwesomeIcon icon={heartIcon} className='text-2xl' />
                </button>
            </div>

            <div className='bgTransparent rounded-b-md 2xl:py-4'>
                <div className='flex justify-evenly items-center py-14 2xl:py-16 px-2'>
                    <FontAwesomeIcon icon={props.currentIcon} className='text-7xl' />
                    <p className='font-montserrat text-7xl '>{props.currentTemp} °F</p>
                </div>

                <div className='flex justify-between items-center pb-5 px-5'>
                    <p className='font-montserrat font-regular'>currently {props.description}</p>
                    <div className='flex gap-2'>
                        <p className='font-oswald font-light text-lg tracking-wide'>H: {props.todayHigh} °</p>
                        <p className='font-oswald font-light text-lg tracking-wide'>L: {props.todayLow} °</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewComponent;
