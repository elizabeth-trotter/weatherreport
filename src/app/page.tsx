'use client'

import { useEffect, useState } from "react";
import OverviewComponent from "./components/OverviewComponent";
import NavComponent from "./components/NavComponent";
import { getCurrentWeather } from "./utils/DataService";
import { ILocationData, IWeatherData } from "@/Interfaces/Interfaces";
import { IconSwitch } from "./utils/IconSwitch";
import TodayComponent from "./components/TodayComponent";


export default function Home() {
  const [date, setDate] = useState<string>('March 25, 2024');
  const [time, setTime] = useState<string>('2:20 PM PST');

  const [searchValue, setSearchValue] = useState<string>('');
  const [citySearch, setCitySearch] = useState<string>('');

  const handleSearch = () => {
    setCitySearch(searchValue);
    console.log('Search button clicked for: ' + searchValue);
  };

  const [lat, setLat] = useState<number>(37.961632);
  const [long, setLong] = useState<number>(-121.275604);
  const [units, setUnits] = useState<string>('imperial');

  // Overview
  // const [city, setCity] = useState<string>('Stockton, CA');
  // const [currentTemp, setCurrentTemp] = useState<number>(61);
  // const [description, setDescription] = useState<string>('currently cloudy');
  // const [todayHigh, setTodayHigh] = useState<number>(69);
  // const [todayLow, setTodayLow] = useState<number>(57);
  const [weatherData, setWeatherData] = useState<IWeatherData>();
  const [locationData, setLocationData] = useState<ILocationData>();

  useEffect(() => {
    const now = new Date();
    const currentDate = now.toLocaleDateString('en-US', { month: 'long', day: "numeric", year: "numeric" })
    const currentTime = now.toLocaleTimeString('en-US', { hour: "numeric", minute: "numeric", timeZoneName: "short" });
    setDate(currentDate);
    setTime(currentTime);
  });

  useEffect(() => {
    const success = (position: any) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    };

    const errorFunc = () => {
      alert('Location NOT receieved.')
      setLat(37.961632);
      setLong(-121.275604);
    };

    navigator.geolocation.getCurrentPosition(success, errorFunc);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getCurrentWeather(lat, long, units)
      // console.log(data);
      setWeatherData(data);
    };
    getData();
  }, [lat, long, units]);

  return (
    <main className='backgroundDay h-lvh'>
      <div className="grid md:grid-cols-60/40 lg:grid-cols-73/27">
        <div className='pt-16 px-12 pb-10'>
          <h1 className='font-montserrat text-4xl font-bold pb-4'>U.S. Weather Report</h1>
          <p className='font-oswald font-light text-xl tracking-wide'>{date}<span className="tracking-widest"> | </span>{time}</p>

          <div className="flex flex-col lg:flex-row gap-4">
            {
              weatherData && <OverviewComponent
                city={weatherData.name}
                state="CA"
                currentIcon={IconSwitch(weatherData.weather[0].main)}
                currentTemp={Math.round(weatherData.main.temp)}
                description={weatherData.weather[0].main.toLowerCase()}
                todayHigh={Math.round(weatherData.main.temp_max)}
                todayLow={Math.round(weatherData.main.temp_min)} />
            }

            <TodayComponent />

          </div>
        </div>

        <NavComponent
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          onSearch={handleSearch} />


      </div>
    </main>
  )
}
