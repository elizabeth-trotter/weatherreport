'use client'

import { INav } from '@/Interfaces/Interfaces'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { getRecentLocalStorage } from '../utils/LocalStorage'
import RecentsComponent from './RecentsComponent'

const NavComponent = (props: INav) => {
    const handleRecentCityClick = (location: string) => {
        props.onRecentCityClick(location);
    };

    return (
        <div className="bg-navyblue min-h-lvh py-7 px-10">
            <div className='flex justify-end'>
                <img src="./logo.png" alt="weather logo" className='w-1/5' />
            </div>

            <div className='pt-9'>
                <div className='search-container py-3 px-3'>
                    <div className="flex flex-1">
                        <input 
                            className="form-control text-black" 
                            type="text"
                            placeholder="Search for a City" 
                            aria-label="Search"
                            value={props.value} 
                            onChange={props.onChange}
                            onKeyDown={props.onKeyDown}
                        />
                        <button className="searchBtnStyle" type="button" onClick={props.onSearch}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='pe-2' />
                        </button>
                    </div>
                </div>

                <div className="row pt-6">
                    <div className="col pt-1">
                        <hr/>
                        <p className="pt-3 font-montserrat text-md font-normal navHeaderColor">Recents</p>
                        <div className="pt-3 pb-5">
                            <div>
                                <RecentsComponent onRecentCityClick={handleRecentCityClick}/>
                            </div>
                        </div>

                        <hr/>
                        <p className="pt-3 font-montserrat text-md font-normal navHeaderColor">Favorites</p>
                        <div className="py-3 overflow-y-auto">
                            <div>

                            </div>
                        </div>
                        <hr/>
                        <div className="pb-5"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavComponent
