export interface IWeatherData {
    "coord": {
        "lon": number,
        "lat": number
    },
    "weather": [
        {
            "id": number,
            "main": string,
            "description": string,
            "icon": string
        }
    ],
    "base": string,
    "main": {
        "temp": number,
        "feels_like": number,
        "temp_min": number,
        "temp_max": number,
        "pressure": number,
        "humidity": number,
        "sea_level": number,
        "grnd_level": number
    },
    "visibility": number,
    "wind": {
        "speed": number,
        "deg": number,
        "gust": number
    },
    "clouds": {
        "all": number
    },
    "dt": number,
    "sys": {
        "country": string,
        "sunrise": number,
        "sunset": number
    },
    "timezone": number,
    "id": number,
    "name": string,
    "cod": number
}

export interface IOverview {
    "city": string,
    "state": string,
    "currentIcon": any,
    "currentTemp": number,
    "description": string,
    "todayHigh": number,
    "todayLow": number
}

export interface IToday {
    morningIcon: any,
    morningTemp: string,
    noonIcon: any,
    noonTemp: string,
    nightIcon: any,
    nightTemp: string,
}

export interface IFiveDay {
    dateDayOne: string,
    dayOneIcon: any,
    dayOneHigh: string,
    dayOneLow: string,

    dateDayTwo: string,
    dayTwoIcon: any,
    dayTwoHigh: string,
    dayTwoLow: string,

    dateDayThree: string,
    dayThreeIcon: any,
    dayThreeHigh: string,
    dayThreeLow: string,

    dateDayFour: string,
    dayFourIcon: any,
    dayFourHigh: string,
    dayFourLow: string,

    dateDayFive: string,
    dayFiveIcon: any,
    dayFiveHigh: string,
    dayFiveLow: string
}

export interface INav {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onSearch: () => void,
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void; 
}

interface Location {
    name: string,
    local_names: {
        [key: string]: string,
    };
    lat: number,
    lon: number,
    country: string,
    state?: string
}

export interface ILocationData extends Array<Location> { }

export interface StateAbbreviations {
    [key: string]: string
}

export interface IHourlyData {
    cod:     string;
    message: number;
    cnt:     number;
    list:    List[];
    city:    City;
}
export interface City {
    id:         number;
    name:       string;
    coord:      Coord;
    country:    string;
    population: number;
    timezone:   number;
    sunrise:    number;
    sunset:     number;
}
export interface Coord {
    lat: number;
    lon: number;
}
export interface List {
    dt:         number;
    main:       MainClass;
    weather:    Weather[];
    clouds:     Clouds;
    wind:       Wind;
    visibility: number;
    pop:        number;
    sys:        Sys;
    dt_txt:     string;
    snow?:      Snow;
}
export interface Clouds {
    all: number;
}
export interface MainClass {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    sea_level:  number;
    grnd_level: number;
    humidity:   number;
    temp_kf:    number;
}
export interface Snow {
    "3h": number;
}
export interface Sys {
    pod: string;
}
export interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}
export interface Wind {
    speed: number;
    deg:   number;
    gust:  number;
}





export interface IWeatherDirectGeo {
    name:         string;
    local_names?: { [key: string]: string };
    lat:          number;
    lon:          number;
    country:      string;
    state:        string;
}