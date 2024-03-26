'use client'

import { useEffect, useState } from "react";
import OverviewComponent from "./components/OverviewComponent";
import NavComponent from "./components/NavComponent";
import { getCurrentWeather } from "./utils/DataService";
import { IWeatherData } from "@/Interfaces/Interfaces";
import { IconSwitch } from "./utils/IconSwitch";
import TodayComponent from "./components/TodayComponent";


export default function Home() {
  const [date, setDate] = useState<string>('March 25, 2024');
  const [time, setTime] = useState<string>('2:20 PM PST');
  // Overview
  // const [city, setCity] = useState<string>('Stockton, CA');
  // const [currentTemp, setCurrentTemp] = useState<number>(61);
  // const [description, setDescription] = useState<string>('currently cloudy');
  // const [todayHigh, setTodayHigh] = useState<number>(69);
  // const [todayLow, setTodayLow] = useState<number>(57);
  const [weatherData, setWeatherData] = useState<IWeatherData>();

  useEffect(() => {
    const now = new Date();
    const currentDate = now.toLocaleDateString('en-US', { month: 'long', day: "numeric", year: "numeric" })
    const currentTime = now.toLocaleTimeString('en-US', { hour: "numeric", minute: "numeric", timeZoneName: "short" });
    setDate(currentDate);
    setTime(currentTime);
  });

  useEffect(() => {
    const getData = async () => {
      const data = await getCurrentWeather(37.961632, -121.275604, 'imperial')
      console.log(data);
      setWeatherData(data);
    };
    getData();
  }, []);

  return (
    <main className='backgroundDay h-lvh'>
      <div className="grid grid-cols-73/27">
        <div className='pt-16 px-12'>
          <h1 className='font-montserrat text-4xl font-bold pb-4'>U.S. Weather Report</h1>
          <p className='font-oswald font-light text-xl tracking-wide'>{date}<span className="tracking-widest"> | </span>{time}</p>

          <div className="flex flex-col lg:flex-row gap-4">
          {
            weatherData && <OverviewComponent 
              city={weatherData.name} 
              currentIcon={IconSwitch(weatherData.weather[0].main)}
              currentTemp={Math.round(weatherData.main.temp)} 
              description={weatherData.weather[0].main.toLowerCase()}
              todayHigh={Math.round(weatherData.main.temp_max)}
              todayLow={Math.round(weatherData.main.temp_min)}/>
          }

          <TodayComponent />

          </div>
        </div>

        <NavComponent />


      </div>
    </main>
  )
}
