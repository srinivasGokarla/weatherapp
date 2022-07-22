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
      <div className="MainHr">
          <div className="HrTemp">
              <h1 >{Math.floor(temp)} °C</h1>
              <img className="HrChartImg"
                      src={
                        main  === "Clear"
                        ? sunny
                        :main  === "Clouds" 
                        ? cloudy
                        :rainy
                      }
                      alt={main}
                    />
                    <div className="HrTimezone">
                      <p>{name} {timezone}</p>
                    </div>
          </div>


          {/* Chart */}

          
          
          
          <div className="ChartMain">
              <ResponsiveContainer width="100%">
                  <AreaChart
                      data={weather.hourly}
   
                  >   
                  <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0852c1" stopOpacity={.8}/>
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
                      stroke="#3831b2" fillOpacity={1} fill="url(#colorUv)"

                       />
                  </AreaChart>
              </ResponsiveContainer>
          </div>
      

      </div>
  )
}


export default TopGraph;