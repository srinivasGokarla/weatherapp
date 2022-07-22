import { useState,useEffect } from 'react';
import '../App.css';
import sunny from '../Images/sunny.png';
import rainy from '../Images/rainy.png';
import cloudy from '../Images/cloudy.png';
import Pin from '../Images/pin.png';
import Search from '../Images/search.png'
import TopGraph from './TopGraph';
import LowerGraph from './LowerGraph';

export const Main = (p) => {
  const [list, setlist] = useState([]);
  const [currTemp, setCurrTemp] = useState("");
  const [curr, setCurr] = useState("");
  const [city, setCity] = useState("");
  const [search,setSearch] = useState("")
  const [val,setVal] = useState("")

  useEffect(() => {
    getlocation();
  }, []);

  const getlocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(currCityWeather);
    } else {
      console.log("Please allow the location")
    }
  };

  const showCity = (e) => { 
    e.preventDefault()

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6d514e6c31ef6012472bbc8bfa14c2d3`)
      .then(res => res.json())
      .then(data => getWeather(data.coord.lon, data.coord.lat))
      .catch(err => console.log(err))
  };

  const getWeather = (lon, lat) => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6d514e6c31ef6012472bbc8bfa14c2d3&units=metric`)
    .then(res => res.json())
    .then(data => show(data))
    .catch(err => console.log(err))
  }

  const currCityWeather = (position) => {
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;

    getWeather(lon, lat);
  }
  const show = (data) => {
    setlist(data.daily)
    setCurrTemp(data.current.temp.toFixed())
    setCurr(data.current)

    console.log(data);
  }

  const getCity = (e) => {
    setCity(e.target.value);
    console.log(e.target.value)
  }

  return (
    <div className='App'>
      <div className="_flex">
        <form onSubmit={showCity}>
          <input className="search_box" placeholder='search...' type="text" onChange={getCity} />
        </form>
        <img className="Location_img" src={Pin} alt="" />
        <img className="Search_img" src={Search} alt=""/>
      </div>
     
     
      <div className="forecast">
        {
          list?.filter((el) => {
      
            if(el.dt === val){
              return el.dt === val
            }else if(val === ""){
                return el
            }
         })
          .filter((a) => {
            if(search === ""){
              return a
            }else{
              return a.dt.includes(search)    
            }
            
          })
          .map((el, i) => {
            //console.log(el.dt)
            const dateTimeStr = new Date(el.dt*1000).toLocaleString("en-US",{weekday:"long"}).slice(0,3);
            return (
              <div key={i} className="_iforecast">
                <div className='Weather_info'>
                  <p className="weekdays">{dateTimeStr}</p>
                  <span className="span">{el.temp.max.toFixed()}&deg;</span>
                  <span className="span mintemp">{el.temp.min.toFixed()}&deg;</span>
                </div>
                <div className="Weather_image">
                  <img className="image" src={(el.weather[0].main === "Clear") ? sunny : (el.weather[0].main === "Rain") ? rainy : cloudy  } alt="" />
                  <p className='Weather_status'>{el.weather[0].main}</p>
                </div>
              </div>
            )
          })}
      </div>
      <div className='GraphDiv'>
        <div className="TempInfo">
          <h1>{currTemp}&deg;C {}<span>
          <img className="img-cloudy" src={cloudy} alt="" />
          </span></h1>
        </div>
        <TopGraph />
        <div className='TempDetails'>
          <div>
            <p>Pressure</p>
            <p>{curr.pressure} hpa</p>
          </div>
          <div>
            <p>Humidity</p>
            <p>{curr.humidity}%</p>
          </div>
        </div>
        <div className='TempDetails1'>
          <div>
            <p>Sunrise</p>
            <p className='setsetTime'>{new Date(curr.sunrise*1000).toLocaleString().slice(0, 18)}am</p>
          </div>
          <div>
            <p>Sunset</p>
            <p className='setsetTime'>{new Date(curr.sunset*1000).toLocaleString().slice(2, 17)}pm</p>
          </div>
        </div>
        <LowerGraph />
      </div>
    </div>
  )
}