import React from "react";
import "../App.css";
import sunny from '../Images/sunny.png';
import rainy from '../Images/rainy.png';
import cloudy from '../Images/cloudy.png';
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
const TopGraph = ({
  weather,
  weather: {  main, name, temp, timezone },
}) => {

  return (
      <div className="TopGraph">
          <div className="top">
              <h1 >{Math.floor(temp)} °C</h1>
              <img className="topImg"
                      src={
                        main  === "Clear"
                        ? sunny
                        :main  === "Clouds" 
                        ? cloudy
                        :rainy
                      }
                      alt={main}
                    />
                    <div className="timezone">
                      <p>{name} {timezone}</p>
                    </div>
          </div>

          <div className="chart">
              <ResponsiveContainer width="100%">
                  <AreaChart
                      data={weather.hourly}
   
                  >   
                  <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0852c1" stopOpacity={.6}/>
                        <stop offset="95%" stopColor="#2240d7" stopOpacity={.2}/>
                      </linearGradient>

                  </defs>
                        <CartesianGrid strokeDasharray="2" />
                      <XAxis dataKey="title" interval={'preserveStartEnd'} />
                      
                      <Tooltip />
                      <Legend />
                      <Area 
                       type="monotone" 
                       dataKey="temp" 
                       activeDot={{r:7}}
                      stroke="#0cbeeb" fillOpacity={1} fill="url(#colorUv)"

                       />
                  </AreaChart>
              </ResponsiveContainer>
          </div>
      

      </div>
  )
}


export default TopGraph;