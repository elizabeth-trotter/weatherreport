import { IHourlyData, IWeatherData } from "@/Interfaces/Interfaces";

// Functions below involve manipulating data from the free OpenWeather API that is not directly available.

// API does not offer morning, afternoon, and night average temperatures for current day weather.
// Code below gathers temperature data for morning, afternoon, and night hours respectively from the hourly forecast.
// Tempertatures are averaged for each time block. 
// Data that is not available for today is based on tomorrow's data. (would prefer to use historical temps but not available)
export function getTodayForecast(hourlyWeatherData: IHourlyData, futureDate1: Date) {
    let morningTempsArr = [], afternoonTempsArr = [], nightTempsArr = [];
    let morningCondition, afternoonCondition, nightCondition;

    for (let i = 0; i < hourlyWeatherData.list.length; i++) {
        let unixFutureTime = new Date(hourlyWeatherData.list[i].dt * 1000);

        if (unixFutureTime.toLocaleDateString('default') === futureDate1.toLocaleDateString('default')) {
            const hours = unixFutureTime.getHours();
            if (hours >= 7 && hours <= 9) {
                morningTempsArr.push(hourlyWeatherData.list[i].main.temp);
                morningCondition = hourlyWeatherData.list[i].weather[0].main;
            } else if (hours >= 11 && hours <= 13) {
                afternoonTempsArr.push(hourlyWeatherData.list[i].main.temp);
                afternoonCondition = hourlyWeatherData.list[i].weather[0].main;
            } else if (hours >= 17 && hours <= 19) {
                nightTempsArr.push(hourlyWeatherData.list[i].main.temp);
                nightCondition = hourlyWeatherData.list[i].weather[0].main;
            }
        }
    }

    const calculateAverage = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0) / arr.length;

    const morningTemp = Math.round(calculateAverage(morningTempsArr)).toString();
    const afternoonTemp = Math.round(calculateAverage(afternoonTempsArr)).toString();
    const nightTemp = Math.round(calculateAverage(nightTempsArr)).toString();

    if (morningCondition && morningTemp && afternoonCondition && afternoonTemp && nightCondition && nightTemp) {
        return [morningCondition, morningTemp, afternoonCondition, afternoonTemp, nightCondition, nightTemp];
    }
}

export function getDates(currentWeatherData: IWeatherData) {
    let todayUnix = currentWeatherData.dt;
    let todayDateTime = new Date(todayUnix * 1000);
    let futureDates = [];

    for (let i = 1; i <= 5; i++) {
        futureDates.push(new Date(todayDateTime.getTime() + (24 * 60 * 60 * 1000 * i)));
    }

    return futureDates;
}


export function formatDate(futureDate: Date) {
    return futureDate.toLocaleDateString('en-US', { weekday: "long", month: "short", day: "numeric" });
}

function frequentCondition(arr: string[]) {
    let count = 1, max = 0, el;

    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] === arr[i - 1]) {
            count++;
        } else {
            count = 1;
        }
        if (count > max) {
            max = count;
            el = arr[i];
        }
    }

    return el || '';
}

function pushDataToDay(data: IHourlyData, i: number, highArr: number[], lowArr: number[], weatherArr: string[]) {
    highArr.push(data.list[i].main.temp_max);
    lowArr.push(data.list[i].main.temp_min);
    weatherArr.push(data.list[i].weather[0].main);
}

// API does not offer temperature highs and lows for future dates.
// Code below gathers temperature data for each of the next five days respectively from the hourly forecast.
// Max and min temperatures are determined for each day's available temps at various hours. 
export function hourlyForecast(hourlyWeatherData: IHourlyData, futureDates: Date[]) {
    const highTemps: number[][] = [];
    const lowTemps: number[][] = [];
    const weatherIcons: string[][] = [];

    for (let i = 0; i < futureDates.length; i++) {
        highTemps[i] = [];
        lowTemps[i] = [];
        weatherIcons[i] = [];
    }

    for (const date of futureDates) {
        const dateString = date.toLocaleDateString('default');

        for (const weather of hourlyWeatherData.list) {
            const unixFutureTime = new Date(weather.dt * 1000).toLocaleDateString('default');

            if (unixFutureTime === dateString) {
                const index = futureDates.findIndex(d => d.toLocaleDateString('default') === dateString);
                if (index !== -1) {
                    pushDataToDay(hourlyWeatherData, index, highTemps[index], lowTemps[index], weatherIcons[index]);
                }
            }
        }
    }

    const dayIcons = weatherIcons.map(arr => frequentCondition(arr));
    const dayHighs = highTemps.map(arr => (Math.round(Math.max(...arr))).toString());
    const dayLows = lowTemps.map(arr => (Math.round(Math.min(...arr))).toString());

    const flatArray = [...dayIcons, ...dayHighs, ...dayLows];
    console.log(flatArray)
    return flatArray;
    // const flatArray: (string)[] = [];

    // const maxLength = Math.max(dayIcons.length, dayHighs.length, dayLows.length);

    // for (let i = 0; i < maxLength; i++) {
    //     flatArray.push(dayIcons[i]);
    //     flatArray.push(dayHighs[i]);
    //     flatArray.push(dayLows[i]);
    // }

    // return flatArray;
}