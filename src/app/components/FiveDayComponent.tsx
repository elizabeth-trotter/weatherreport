import { IFiveDay } from '@/Interfaces/Interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const FiveDayComponent = (props: IFiveDay) => {
  return (
    <div className='pt-4 ps-0 md:ps-2 w-full'>
      <div className='bgTransparent rounded-md 2xl:py-5'>
        <div className='h-14 p-8'>
          <h2 className='font-montserrat text-center font-semibold text-2xl'>5 Day Forecast</h2>
        </div>

        <div className='flex flex-row flex-wrap gap-10 md:flex-nowrap md:overflow-x-auto justify-around pt-10 pb-8 px-5'>
          <div className='flex flex-col justify-center items-center gap-11 pb-3 whitespace-nowrap'>
            <p className='font-oswald font-light text-lg'>{props.dateDayOne}</p>
            <FontAwesomeIcon icon={props.dayOneIcon} className='text-4xl' />
            <div className='flex gap-3'>
              <p className='font-oswald font-light text-md tracking-wide'>H: {props.dayOneHigh} °</p>
              <p className='font-oswald font-light text-md tracking-wide'>L: {props.dayOneLow} °</p>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-11 pb-3 whitespace-nowrap'>
            <p className='font-oswald font-light text-lg'>{props.dateDayTwo}</p>
            <FontAwesomeIcon icon={props.dayTwoIcon} className='text-4xl' />
            <div className='flex gap-3'>
              <p className='font-oswald font-light text-md tracking-wide'>H: {props.dayTwoHigh} °</p>
              <p className='font-oswald font-light text-md tracking-wide'>L: {props.dayTwoLow} °</p>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-11 pb-3 whitespace-nowrap'>
            <p className='font-oswald font-light text-lg'>{props.dateDayThree}</p>
            <FontAwesomeIcon icon={props.dayThreeIcon} className='text-4xl' />
            <div className='flex gap-3'>
              <p className='font-oswald font-light text-md tracking-wide'>H: {props.dayThreeHigh} °</p>
              <p className='font-oswald font-light text-md tracking-wide'>L: {props.dayThreeLow} °</p>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-11 pb-3 whitespace-nowrap'>
            <p className='font-oswald font-light text-lg'>{props.dateDayFour}</p>
            <FontAwesomeIcon icon={props.dayFourIcon} className='text-4xl' />
            <div className='flex gap-3'>
              <p className='font-oswald font-light text-md tracking-wide'>H: {props.dayFourHigh} °</p>
              <p className='font-oswald font-light text-md tracking-wide'>L: {props.dayFourLow} °</p>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center gap-11 pb-3 whitespace-nowrap'>
            <p className='font-oswald font-light text-lg'>{props.dateDayFive}</p>
            <FontAwesomeIcon icon={props.dayFiveIcon} className='text-4xl' />
            <div className='flex gap-3'>
              <p className='font-oswald font-light text-md tracking-wide'>H: {props.dayFiveHigh} °</p>
              <p className='font-oswald font-light text-md tracking-wide'>L: {props.dayFiveLow} °</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FiveDayComponent
