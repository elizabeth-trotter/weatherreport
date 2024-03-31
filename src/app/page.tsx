'use client'

import { useEffect, useState } from "react";
import OverviewComponent from "./components/OverviewComponent";
import NavComponent from "./components/NavComponent";
import { getCurrentWeather, getHourlyWeather, getLocationReverseGeo, getWeatherDirectGeo } from "./utils/DataService";
import { IHourlyData, ILocationData, IWeatherData } from "@/Interfaces/Interfaces";
import { IconSwitch, NightIconSwitch } from "./utils/IconSwitch";
import TodayComponent from "./components/TodayComponent";
import { stateAb } from "./utils/StateConvert";
import { formatDate, getDates, getTodayForecast, hourlyForecast } from "./utils/HourlyFunction";
import { faCloud, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import FiveDayComponent from "./components/FiveDayComponent";
import { saveRecentToLocalStorage } from "./utils/LocalStorage";


export default function Home() {
  const [date, setDate] = useState<string>('March 25, 2024');
  const [time, setTime] = useState<string>('2:20 PM PST');

  const [searchValue, setSearchValue] = useState<string>('');
  const [citySearch, setCitySearch] = useState<string>('');

  const handleSearch = () => {
    if (searchValue) {
      setCitySearch(searchValue);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchValue) {
        setCitySearch(searchValue);
      }
    }
  };

  const handleRecentCityClick = (location: string) => {
    setCitySearch(location);
  };

  // Search Criteria - API Req. Inputs
  const [lat, setLat] = useState<number>(37.961632);
  const [long, setLong] = useState<number>(-121.275604);
  const [units, setUnits] = useState<string>('imperial');
  // Data Fetched
  const [weatherData, setWeatherData] = useState<IWeatherData>();
  const [locationData, setLocationData] = useState<ILocationData>();
  const [hourlyWeatherData, setHourlyWeatherData] = useState<IHourlyData>();
  // Today Component Props to Pass
  const [morningIcon, setMorningIcon] = useState<any>(faSun), [morningTemp, setMorningTemp] = useState<string>('');
  const [noonIcon, setNoonIcon] = useState<any>(faCloud), [noonTemp, setNoonTemp] = useState<string>('');
  const [nightIcon, setNightIcon] = useState<any>(faMoon), [nightTemp, setNightTemp] = useState<string>('');
  // Five Day Component Props to Pass
  const [dateDayOne, setDateDayOne] = useState<string>(''), [dayOneIcon, setDayOneIcon] = useState<any>(faSun);
  const [dayOneHigh, setDayOneHigh] = useState<string>(''), [dayOneLow, setDayOneLow] = useState<string>('');
  const [dateDayTwo, setDateDayTwo] = useState<string>(''), [dayTwoIcon, setDayTwoIcon] = useState<any>(faSun);
  const [dayTwoHigh, setDayTwoHigh] = useState<string>(''), [dayTwoLow, setDayTwoLow] = useState<string>('');
  const [dateDayThree, setDateDayThree] = useState<string>(''), [dayThreeIcon, setDayThreeIcon] = useState<any>(faSun);
  const [dayThreeHigh, setDayThreeHigh] = useState<string>(''), [dayThreeLow, setDayThreeLow] = useState<string>('');
  const [dateDayFour, setDateDayFour] = useState<string>(''), [dayFourIcon, setDayFourIcon] = useState<any>(faSun);
  const [dayFourHigh, setDayFourHigh] = useState<string>(''), [dayFourLow, setDayFourLow] = useState<string>('');
  const [dateDayFive, setDateDayFive] = useState<string>(''), [dayFiveIcon, setDayFiveIcon] = useState<any>(faSun);
  const [dayFiveHigh, setDayFiveHigh] = useState<string>(''), [dayFiveLow, setDayFiveLow] = useState<string>('');

  // User Location Request
  useEffect(() => {
    const success = (position: any) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      const getData = async () => {
        const data = await getCurrentWeather(lat, long, units)
        setWeatherData(data);
        const locationData = await getLocationReverseGeo(lat, long);
        setLocationData(locationData);
        const hourlyData = await getHourlyWeather(lat, long, units);
        setHourlyWeatherData(hourlyData);
      };
      getData();
    };

    const errorFunc = () => {
      setLat(37.961632);
      setLong(-121.275604);
    };

    navigator.geolocation.getCurrentPosition(success, errorFunc);
  }, []);

  // Date & Time
  useEffect(() => {
    const now = new Date();
    const currentDate = now.toLocaleDateString('en-US', { month: 'long', day: "numeric", year: "numeric" })
    const currentTime = now.toLocaleTimeString('en-US', { hour: "numeric", minute: "numeric", timeZoneName: "short" });
    setDate(currentDate);
    setTime(currentTime);
  });

  // User Search
  useEffect(() => {
    const getData = async () => {
      const data = await getWeatherDirectGeo(citySearch);
      setLat(data[0].lat);
      setLong(data[0].lon);
    };
    getData();

    if (locationData) {
      saveRecentToLocalStorage(`${locationData[0].name}, ${locationData[0].state ? stateAb[locationData[0].state] : ''}`);
    }
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
      
      if (todayForecastArr) {
        setMorningIcon(IconSwitch(todayForecastArr[0]));
        setMorningTemp(todayForecastArr[1]);
        setNoonIcon(IconSwitch(todayForecastArr[2]));
        setNoonTemp(todayForecastArr[3]);
        setNightIcon(NightIconSwitch(todayForecastArr[4]));
        setNightTemp(todayForecastArr[5]);
      }
    }
  }, [weatherData, hourlyWeatherData]);

  // 5 Day Weather w/ Helper Functions
  useEffect(() => {
    if (weatherData && hourlyWeatherData) {
      const dateArray = getDates(weatherData);
      const setDateSetter = [setDateDayOne, setDateDayTwo, setDateDayThree, setDateDayFour, setDateDayFive];

      const futureArr = hourlyForecast(hourlyWeatherData, dateArray);
      const setIconSetter = [setDayOneIcon, setDayTwoIcon, setDayThreeIcon, setDayFourIcon, setDayFiveIcon];
      const setHighSetter = [setDayOneHigh, setDayTwoHigh, setDayThreeHigh, setDayFourHigh, setDayFiveHigh];
      const setLowSetter = [setDayOneLow, setDayTwoLow, setDayThreeLow, setDayFourLow, setDayFiveLow];

      for (let i = 0; i < setDateSetter.length; i++) {
        setDateSetter[i](formatDate(dateArray[i]));
        setIconSetter[i](IconSwitch(futureArr[i]));
        setHighSetter[i](futureArr[i + 5]);
        setLowSetter[i](futureArr[i + 10]);
      }

    }
  }, [weatherData, hourlyWeatherData]);

  return (
    <main className='backgroundDay min-h-screen'>
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
                morningIcon={morningIcon} morningTemp={morningTemp}
                noonIcon={noonIcon} noonTemp={noonTemp}
                nightIcon={nightIcon} nightTemp={nightTemp}
              />
            }
          </div>

          <div>
            {
              weatherData && <FiveDayComponent
                dateDayOne={dateDayOne} dayOneIcon={dayOneIcon} dayOneHigh={dayOneHigh} dayOneLow={dayOneLow}
                dateDayTwo={dateDayTwo} dayTwoIcon={dayTwoIcon} dayTwoHigh={dayTwoHigh} dayTwoLow={dayTwoLow}
                dateDayThree={dateDayThree} dayThreeIcon={dayThreeIcon} dayThreeHigh={dayThreeHigh} dayThreeLow={dayThreeLow}
                dateDayFour={dateDayFour} dayFourIcon={dayFourIcon} dayFourHigh={dayFourHigh} dayFourLow={dayFourLow}
                dateDayFive={dateDayFive} dayFiveIcon={dayFiveIcon} dayFiveHigh={dayFiveHigh} dayFiveLow={dayFiveLow}
              />
            }
          </div>
        </div>

        <div className="px-0 sm:px-12 md:px-0 min-h-svh md:min-h-lvh">
          <NavComponent
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            onKeyDown={handleInputKeyDown}
            onRecentCityClick={handleRecentCityClick}
          />
        </div>

      </div>
    </main>
  )
}
