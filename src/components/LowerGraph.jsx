import React from "react";
import Chart from "react-apexcharts";
import "../App.css";
import {formatToLocalTime} from "./Weather"

function LowerGraph({
  weather: { sunrise, sunset, humidity, pressure ,timezone},

}) {
    var obj = {
        series: [{
            data: [0, 38, 0]
          }],
          options: {
                colors:["#FEE266"],
            grid: {
                show:false
              },
            dataLabels: {
                enabled: false
              },
            chart: {
              zoom:{
                enabled:false
              }
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              categories: ["5am","2pm","6pm"]
            },
            yaxis:{
                show:false
              },
          },
        };    
    return (
      
      <div className="LowerGraph1">
        <div>
        <div className='lower'>
          <div>
            <p>Pressure:  <span>{pressure} hpa</span></p>
           
          </div>
          <div>
            <p>Humidity:  <span >{humidity}%</span> </p>
           
          </div>
        </div>
        <div className='lower1'>
          <div>
            <p>Sunrise :  <span className='set'>{formatToLocalTime(sunrise, timezone, "h:mm")}am</span></p>
           
          </div>
          <div>
            <p>Sunset : <span className='set'>{formatToLocalTime(sunset, timezone, "h:mm")}pm</span></p>
            
          </div>
        </div>
        <div className="LowerGraph2">
          <div className="LowerGraph3">
            <Chart
              options={obj.options}
              series={obj.series}
              type="area"
              width="100%"
              height={190}
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
export default LowerGraph;