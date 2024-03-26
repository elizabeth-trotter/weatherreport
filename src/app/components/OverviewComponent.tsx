'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSun, faSnowflake } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart, faMagnifyingGlass, faCloud, faCloudRain, faCloudShowersHeavy, faBoltLightning, faTornado, faSmog } from "@fortawesome/free-solid-svg-icons";


const OverviewComponent = () => {
    const [city, setCity] = useState<string>('Stockton, CA');
    const [currentTemp, setCurrentTemp] = useState<number>(61);
    const [description, setDescription] = useState<string>('currently cloudy');
    const [todayHigh, setTodayHigh] = useState<number>(69);
    const [todayLow, setTodayLow] = useState<number>(57);

    return (
        <section>
            <div className='pt-20 ps-2 w-1/2'>
                <div className='bg-navyblue flex justify-between items-center rounded-t-md h-14 p-4'>
                    <h2 className='font-montserrat font-semibold text-2xl'>{city}</h2>
                    <FontAwesomeIcon icon={faHeart} className='text-xl'/>
                </div>

                <div className='bgTransparent rounded-b-md'>
                    <div className='flex justify-evenly items-center py-10 px-2'>
                        <FontAwesomeIcon icon={faCloudRain} className='text-7xl'/>
                        <p className='font-montserrat text-7xl '>{currentTemp} °F</p>
                    </div>

                    <div className='flex justify-between items-center pb-5 px-5'>
                        <p className='font-montserrat font-regular'>{description}</p>
                        <p className='font-oswald font-light text-lg tracking-wide'>H: {todayHigh} ° L: {todayLow} °</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OverviewComponent;
