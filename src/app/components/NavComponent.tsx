import { INav } from '@/Interfaces/Interfaces'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NavComponent = (props: INav) => {
    const handleButtonClick = () => {
        props.onSearch();
    };


    return (
        <div className="bg-navyblue h-lvh p-7">
            <div className='flex justify-end'>
                <img src="./logo.png" alt="weather logo" className='w-1/5' />
            </div>

            <div className='pt-9'>
                <div className='search-container py-3 px-3'>
                    <div className="flex flex-1">
                        <input className="form-control text-black" type="text"
                            placeholder="Search for a City" aria-label="Search"
                            value={props.value} onChange={props.onChange} />
                        <button className="searchBtnStyle" type="button" onClick={handleButtonClick}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='pe-2' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavComponent
