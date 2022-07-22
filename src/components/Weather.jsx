import { DateTime } from "luxon";

const API_KEY = "6d514e6c31ef6012472bbc8bfa14c2d3";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, temp_min, temp_max, humidity, pressure },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
    } = data;

  const { main, icon } = weather[0];
    return {
        lat,
        lon,
        temp,
        temp_min,
        temp_max,
        humidity,
        pressure,
        name,
        dt,
        country,
        sunrise,
        sunset,
        main,
        icon,
    };
};

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;

    daily = daily.slice(0, 7).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: d.temp.day,
            min: d.temp.min,
            max: d.temp.max,
            icon: d.weather[0].icon,
            type: d.weather[0].main,
        };
    });

    hourly = hourly.slice(1, 25).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp,
            icon: d.weather[0].icon,
            type: d.weather[0].main,
        };
    });

    return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
    }).then(formatForecastWeather);
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

// formating Local Time
const formatToLocalTime = (secs,zone,format = "cccc, dd LLL yyyy' | Local time:'hh:mm a") => 
DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;
export { formatToLocalTime };