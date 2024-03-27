import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart, faMagnifyingGlass, faCloud, faSun } from "@fortawesome/free-solid-svg-icons";
import { IOverview, IToday } from '@/Interfaces/Interfaces'

const TodayComponent = (props: IToday) => {

  return (
    <div className='ps-2 lg:ps-0 lg:pt-20 w-full lg:w-1/2'>
      <div className='bgBlueBody rounded-md'>
        <div className='h-14 p-6'>
          <h2 className='font-montserrat text-center font-semibold text-xl'>Today</h2>
        </div>

        <div className='flex flex-row justify-around py-6'>
          <div className='flex flex-col justify-center items-center gap-10 pb-3'>
            <p className='font-oswald font-light text-lg'>Morning</p>
            <FontAwesomeIcon icon={props.morningIcon} className='text-4xl' />
            <p className='font-oswald font-light text-lg tracking-wide'>{props.morningTemp} °F</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-10 pb-3'>
            <p className='font-oswald font-light text-lg'>Noon</p>
            <FontAwesomeIcon icon={props.noonIcon} className='text-4xl' />
            <p className='font-oswald font-light text-lg tracking-wide'>{props.noonTemp} °F</p>
          </div>
          <div className='flex flex-col justify-center items-center gap-10 pb-3'>
            <p className='font-oswald font-light text-lg'>Evening</p>
            <FontAwesomeIcon icon={props.nightIcon} className='text-4xl' />
            <p className='font-oswald font-light text-lg tracking-wide'>{props.nightTemp} °F</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodayComponent
