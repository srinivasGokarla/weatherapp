import { useState,useEffect } from 'react';
import '../App.css';
import sunny from '../Images/sunny.png';
import rainy from '../Images/rainy.png';
import cloudy from '../Images/cloudy.png';

export default function Weeklist({ weather: { daily } }) {
    const [list, setList] = useState(daily[0].title);

    const handleList = (title) => {
        let temp = daily.filter((p) => p.title === title);
        setList(temp);
    };
    console.log(list);
  return (
    <div>
 <div className="main_weeklist">
            {daily.map((days, i) => {
                return (
                  <div 
                //   style={{marginTop:"-10px"}}
                    onClick={() => handleList(days.title)}
                    key={i + 1}
                    // class="WeekListCard"
                    className={list[0].title === days.title ? "list" : ""}
                  >
                    <p style={{marginTop:"-0px"}}>{days.title}</p>
                    <p className="listMinMax">
                      <spaen>{Math.floor(days.max)} °</spaen>
                      <span>{Math.floor(days.min)} °</span>
                    </p>
                    <div>
                      <img className="ListImg"
                        src={
                          days.type === "Clear"
                          ? sunny
                          :days.type === "Clouds" 
                          ? cloudy
                          :rainy
                        }
                        alt={days.type}
                      />
                    </div>
                    <p>{days.type}</p>
                  </div>
                );
            })}


            </div>
    </div>
  )
}
