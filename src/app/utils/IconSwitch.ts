import {faSun,  faSnowflake, faCloud, faCloudRain, faCloudShowersHeavy, faBoltLightning, faTornado, faSmog, faMoon } from "@fortawesome/free-solid-svg-icons";

export function IconSwitch(weather: string) {
    switch (weather) {
        case "Clear":
            return faSun;
        case "Clouds":
            return faCloud;
        case "Drizzle":
            return faCloudRain;
        case "Rain":
            return faCloudShowersHeavy;
        case "Snow":
            return faSnowflake;
        case "Thunderstorm":
            return faBoltLightning;
        case "Tornado":
            return faTornado;
        default:
            return faSmog;
    }
}

export function NightIconSwitch(weather: string) {
    switch (weather) {
        case "Clear":
            return faMoon;
        case "Clouds":
            return faCloud;
        case "Drizzle":
            return faCloudRain;
        case "Rain":
            return faCloudShowersHeavy;
        case "Snow":
            return faSnowflake;
        case "Thunderstorm":
            return faBoltLightning;
        case "Tornado":
            return faTornado;
        default:
            return faSmog;
    }
}