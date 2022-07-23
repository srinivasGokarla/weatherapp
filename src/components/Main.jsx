import { useState,useEffect } from 'react';
import '../App.css';
import TopGraph from './TopGraph';
import LowerGraph from './LowerGraph';
import Search from "./Search";
import getFormattedWeatherData from "./Weather";
import WeekList from "./Weeklist"


export const Main = () => {
 
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState();
 
  useEffect(() => {
    const fetch = async () => {
        await getFormattedWeatherData({ ...query, units: "metric" }).then(
            (data) => {
                setWeather(data);
            }
        );
    };
    
    fetch();

    }, [query]);


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