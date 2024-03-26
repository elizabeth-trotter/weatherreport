import { IWeatherData } from "@/Interfaces/Interfaces";

export const getCurrentWeather = async (userLat: number, userLon: number, units: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=${units}`);
    const data: IWeatherData = await promise.json();
    return data;
};

export const getLocationReverseGeo = async (userLat: number, userLon: number) => {
    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${userLat}&lon=${userLon}&limit=5&appid=${process.env.NEXT_PUBLIC_API_KEY}`)
    const data = await promise.json();
    return data;
};