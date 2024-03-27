import { IHourlyData, IWeatherData } from "@/Interfaces/Interfaces";

export function getTodayForecast(hourlyWeatherData: IHourlyData, futureDate1: Date) {
    let morningTempsArr = [], afternoonTempsArr = [], nightTempsArr = [];
    let morningCondition, afternoonCondition, nightCondition;

    console.log(hourlyWeatherData);
    for (let i = 0; i < hourlyWeatherData.list.length; i++) {
        let unixFutureTime = new Date(hourlyWeatherData.list[i].dt * 1000);

        //All Highs & Lows for Each Day
        if (unixFutureTime.toLocaleDateString('default') === futureDate1.toLocaleDateString('default')) {

            //Today's Morning, Afternoon, Night Temps Based on Tomorrow's Data
            const hours = unixFutureTime.getHours();

            const morningStart = 7, morningEnd = 9;
            const afternoonStart = 11, afternoonEnd = 13;
            const nightStart = 17, nightEnd = 19;

            if (hours >= morningStart && hours <= morningEnd) {
                morningTempsArr.push(hourlyWeatherData.list[i].main.temp);
                morningCondition = hourlyWeatherData.list[i].weather[0].main;
            } else if (hours >= afternoonStart && hours <= afternoonEnd) {
                afternoonTempsArr.push(hourlyWeatherData.list[i].main.temp);
                afternoonCondition = hourlyWeatherData.list[i].weather[0].main;
            } else if (hours >= nightStart && hours <= nightEnd) {
                nightTempsArr.push(hourlyWeatherData.list[i].main.temp);
                nightCondition = hourlyWeatherData.list[i].weather[0].main;
            }
        }
    }

    //Average Calculations (Today's Morning, Afternoon, Night Temps)
    let sumMorning = 0, sumAfternoon = 0, sumNight = 0;
    for (let i = 0; i < morningTempsArr.length; i++) {
        sumMorning += morningTempsArr[i];
    }
    let morningTempsAverage = sumMorning / morningTempsArr.length;

    for (let i = 0; i < afternoonTempsArr.length; i++) {
        sumAfternoon += afternoonTempsArr[i];
    }
    let afternoonTempsAverage = sumAfternoon / afternoonTempsArr.length;

    for (let i = 0; i < nightTempsArr.length; i++) {
        sumNight += nightTempsArr[i];
    }
    let nightTempsAverage = sumNight / nightTempsArr.length;

    // Today Morning, Afternoon, Night Set
    let morningTemp = (Math.round(morningTempsAverage)).toString();
    let afternoonTemp = (Math.round(afternoonTempsAverage)).toString();
    let nightTemp = (Math.round(nightTempsAverage)).toString();
    // Night icon is always set to moon

    if (morningCondition && morningTemp && afternoonCondition && afternoonTemp && nightCondition && nightTemp) {
        let result = [morningCondition, morningTemp, afternoonCondition, afternoonTemp, nightCondition, nightTemp];
        return result;
    }
}

export function getDates(currentWeatherData: IWeatherData) {
    let todayUnix = currentWeatherData.dt;
    let todayDateTime = new Date(todayUnix * 1000);

    let futureDate1 = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));
    let futureDate2 = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));
    let futureDate3 = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));
    let futureDate4 = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));
    let futureDate5 = new Date(todayDateTime.setHours(todayDateTime.getHours() + (24)));

    //Set Dates for Forecast
    let dateDayOne = futureDate1.toLocaleDateString('en-US', { weekday: "long" }) + ", " + futureDate1.toLocaleDateString('en-US', { month: "short", day: "numeric" });
    let dateDayTwo = futureDate2.toLocaleDateString('en-US', { weekday: "long" }) + ", " + futureDate2.toLocaleDateString('en-US', { month: "short", day: "numeric" });
    let dateDayThree = futureDate3.toLocaleDateString('en-US', { weekday: "long" }) + ", " + futureDate3.toLocaleDateString('en-US', { month: "short", day: "numeric" });
    let dateDayFour = futureDate4.toLocaleDateString('en-US', { weekday: "long" }) + ", " + futureDate4.toLocaleDateString('en-US', { month: "short", day: "numeric" });
    let dateDayFive = futureDate5.toLocaleDateString('en-US', { weekday: "long" }) + ", " + futureDate5.toLocaleDateString('en-US', { month: "short", day: "numeric" });

    return [dateDayOne, dateDayTwo, dateDayThree, dateDayFour, dateDayFive];
}

// export function hourlyForecast(hourlyWeatherData: any) {
//     let highDay1 = [], highDay2 = [], highDay3 = [], highDay4 = [], highDay5 = [];
//     let lowDay1 = [], lowDay2 = [], lowDay3 = [], lowDay4 = [], lowDay5 = [];
//     let weatherDay1 = [], weatherDay2 = [], weatherDay3 = [], weatherDay4 = [], weatherDay5 = [];

//     for (let i = 0; i < hourlyWeatherData.list.length; i++) {
//         let unixFutureTime = new Date(hourlyWeatherData.list[i].dt * 1000)
//         //All Highs & Lows for Each Day
//         if (unixFutureTime.toLocaleDateString('default') === futureDate1.toLocaleDateString('default')) {
//             highDay1.push(hourlyWeatherData.list[i].main.temp_max)
//             lowDay1.push(hourlyWeatherData.list[i].main.temp_min)
//             weatherDay1.push(hourlyWeatherData.list[i].weather[0].main)
//         }
//         else if (unixFutureTime.toLocaleDateString('default') === futureDate2.toLocaleDateString('default')) {
//             highDay2.push(hourlyWeatherData.list[i].main.temp_max)
//             lowDay2.push(hourlyWeatherData.list[i].main.temp_min)
//             weatherDay2.push(hourlyWeatherData.list[i].weather[0].main)
//         }
//         else if (unixFutureTime.toLocaleDateString('default') === futureDate3.toLocaleDateString('default')) {
//             highDay3.push(hourlyWeatherData.list[i].main.temp_max)
//             lowDay3.push(hourlyWeatherData.list[i].main.temp_min)
//             weatherDay3.push(hourlyWeatherData.list[i].weather[0].main)
//         }
//         else if (unixFutureTime.toLocaleDateString('default') === futureDate4.toLocaleDateString('default')) {

//             highDay4.push(hourlyWeatherData.list[i].main.temp_max)
//             lowDay4.push(hourlyWeatherData.list[i].main.temp_min)
//             weatherDay4.push(hourlyWeatherData.list[i].weather[0].main)
//         }
//         else if (unixFutureTime.toLocaleDateString('default') === futureDate5.toLocaleDateString('default')) {
//             highDay5.push(hourlyWeatherData.list[i].main.temp_max)
//             lowDay5.push(hourlyWeatherData.list[i].main.temp_min)
//             weatherDay5.push(hourlyWeatherData.list[i].weather[0].main)
//         }
//     }

//     // 5 Day Forcast Set (Calculate Highest & Lowest)
//     setIcon(dayOneIcon, frequentCondition(weatherDay1));
//     let dayOneHigh = Math.round(Math.max(...highDay1));
//     let dayOneLow = Math.round(Math.min(...lowDay1));

//     setIcon(dayTwoIcon, frequentCondition(weatherDay2));
//     let dayTwoHigh = Math.round(Math.max(...highDay2));
//     let dayTwoLow = Math.round(Math.min(...lowDay2));

//     setIcon(dayThreeIcon, frequentCondition(weatherDay3));
//     let dayThreeHigh = Math.round(Math.max(...highDay3));
//     let dayThreeLow = Math.round(Math.min(...lowDay3));

//     setIcon(dayFourIcon, frequentCondition(weatherDay4));
//     let dayFourHigh = Math.round(Math.max(...highDay4));
//     let dayFourLow = Math.round(Math.min(...lowDay4));

//     setIcon(dayFiveIcon, frequentCondition(weatherDay5));
//     let dayFiveHigh = Math.round(Math.max(...highDay5));
//     let dayFiveLow = Math.round(Math.min(...lowDay5));
// }