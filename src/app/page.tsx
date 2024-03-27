'use client'

import { useEffect, useState } from "react";
import OverviewComponent from "./components/OverviewComponent";
import NavComponent from "./components/NavComponent";
import { getCurrentWeather, getHourlyWeather, getLocationReverseGeo, getWeatherDirectGeo } from "./utils/DataService";
import { IHourlyData, ILocationData, IWeatherData } from "@/Interfaces/Interfaces";
import { IconSwitch } from "./utils/IconSwitch";
import TodayComponent from "./components/TodayComponent";
import { stateAb } from "./utils/StateConvert";
import { getTodayForecast } from "./utils/HourlyFunction";
import { faCloud, faSun } from "@fortawesome/free-solid-svg-icons";


export default function Home() {
  const [date, setDate] = useState<string>('March 25, 2024');
  const [time, setTime] = useState<string>('2:20 PM PST');

  const [searchValue, setSearchValue] = useState<string>('');
  const [citySearch, setCitySearch] = useState<string>('');

  const handleSearch = () => {
    if(searchValue){
      setCitySearch(searchValue);
      console.log('Search button clicked for: ' + searchValue);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(searchValue){
        setCitySearch(searchValue);
      }
    }
  };

  const [lat, setLat] = useState<number>(37.961632);
  const [long, setLong] = useState<number>(-121.275604);
  const [units, setUnits] = useState<string>('imperial');

  const [weatherData, setWeatherData] = useState<IWeatherData>();
  const [locationData, setLocationData] = useState<ILocationData>();
  const [hourlyWeatherData, setHourlyWeatherData] = useState<IHourlyData>();

  const [morningIcon, setMorningIcon] = useState<any>(faSun);
  const [morningTemp, setMorningTemp] = useState<string>('');
  const [noonIcon, setNoonIcon] = useState<any>(faCloud);
  const [noonTemp, setNoonTemp] = useState<string>('');
  const [nightIcon, setNightIcon] = useState<any>(faCloud);
  const [nightTemp, setNightTemp] = useState<string>('');

  // Date & Time
  useEffect(() => {
    const now = new Date();
    const currentDate = now.toLocaleDateString('en-US', { month: 'long', day: "numeric", year: "numeric" })
    const currentTime = now.toLocaleTimeString('en-US', { hour: "numeric", minute: "numeric", timeZoneName: "short" });
    setDate(currentDate);
    setTime(currentTime);
  });

  // User Location Request
  useEffect(() => {
    const success = (position: any) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log('user lcoation used' + lat);
    };

    const errorFunc = () => {
      alert('Location NOT receieved.')
      setLat(37.961632);
      setLong(-121.275604);
    };

    navigator.geolocation.getCurrentPosition(success, errorFunc);
  }, []);

  // User Search
  useEffect(() => {
    const getData = async () => {
      const data = await getWeatherDirectGeo(citySearch);
      setLat(data[0].lat);
      setLong(data[0].lon);
    };
    getData();
  }, [citySearch]);

  // Get Various Weather Data
  useEffect(() => {
    const getData = async () => {
      const data = await getCurrentWeather(lat, long, units)
      setWeatherData(data);
      const locationData = await getLocationReverseGeo(lat, long);
      setLocationData(locationData);
      const hourlyData = await getHourlyWeather(lat, long, units);
      setHourlyWeatherData(hourlyData);
    };
    getData();
  }, [lat, long, units]);

  // Today Weather w/ Helper Functions
  useEffect(() => {
    if (weatherData && hourlyWeatherData) {
      let todayUnix = weatherData.dt;
      let todayDateTime = new Date(todayUnix * 1000);
      let estimatedTodayBasedOnTmrw = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));

      let todayForecastArr = getTodayForecast(hourlyWeatherData, estimatedTodayBasedOnTmrw);
      console.log('forcast array on page.tsx ' + todayForecastArr)
      if (todayForecastArr) {
        setMorningIcon(IconSwitch(todayForecastArr[0]));
        setMorningTemp(todayForecastArr[1]);
        setNoonIcon(IconSwitch(todayForecastArr[2]));
        setNoonTemp(todayForecastArr[3]);
        setNightIcon(IconSwitch(todayForecastArr[4]));
        setNightTemp(todayForecastArr[5]);
      }
    }
  }, [weatherData, locationData, hourlyWeatherData]);

  // 5 Day Weather w/ Helper Functions
  // useEffect(() => {

  // }, [weatherData, locationData, hourlyWeatherData]);

  return (
    <main className='backgroundDay h-lvh'>
      <div className="grid md:grid-cols-60/40 lg:grid-cols-73/27">
        <div className='pt-16 px-12 pb-10'>
          <h1 className='font-montserrat text-4xl font-bold pb-4'>U.S. Weather Report</h1>
          <p className='font-oswald font-light text-xl tracking-wide'>{date}<span className="tracking-widest"> | </span>{time}</p>

          <div className="flex flex-col lg:flex-row gap-4">
            {
              weatherData && locationData && <OverviewComponent
                city={locationData[0].name}
                state={locationData[0].state ? stateAb[locationData[0].state] : ''}
                currentIcon={IconSwitch(weatherData.weather[0].main)}
                currentTemp={Math.round(weatherData.main.temp)}
                description={weatherData.weather[0].main.toLowerCase()}
                todayHigh={Math.round(weatherData.main.temp_max)}
                todayLow={Math.round(weatherData.main.temp_min)}
              />
            }

            {
              weatherData && <TodayComponent
                morningIcon={morningIcon}
                morningTemp={morningTemp}
                noonIcon={noonIcon}
                noonTemp={noonTemp}
                nightIcon={nightIcon}
                nightTemp={nightTemp}
              />
            }

          </div>
        </div>

        <NavComponent
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          onKeyDown={handleInputKeyDown}
        />


      </div>
    </main>
  )
}
