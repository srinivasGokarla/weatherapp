import { useState,useEffect } from 'react';
import '../App.css';
import sunny from '../Images/sunny.png';
import rainy from '../Images/rainy.png';
import cloudy from '../Images/cloudy.png';
import Pin from '../Images/pin.png';
import TopGraph from './TopGraph';
import LowerGraph from './LowerGraph';
import {cities} from "./db";
import Search from "./Search";
import getFormattedWeatherData from "./Weather";
import WeekList from "./Weeklist"


export const Main = () => {
 
 
  const [curr, setCurr] = useState("");
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState();
 
  useEffect(() => {
    const fetchWeather = async () => {
        await getFormattedWeatherData({ ...query, units: "metric" }).then(
            (data) => {
                setWeather(data);
            }
        );
    };
    
    fetchWeather();

    }, [query]);


console.log("weather",weather)
console.log("query", query)

  

  return (
    <div className='App'>
     
     <Search weather={weather} setQuery={setQuery} />
     
     {weather && (
                        <div>
                           
                           <WeekList weather={weather} />
                            <TopGraph  weather={weather} />
                            <LowerGraph weather={weather} />
                           
                           
                        </div>
                    )}
     
     

      </div>
  
  )
}