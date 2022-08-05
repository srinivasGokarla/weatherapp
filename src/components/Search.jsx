import { useState,useEffect, useRef } from 'react';
import '../App.css';
import Pin from '../Images/pin.png';
import SearchIcon from '../Images/Searchicon.png'
import {cities} from "./cities"

export default function Search({setQuery}) {

    const [city, setCity] = useState("");
    const myRef = useRef();

    const [data, setData] = useState([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setQuery({ lat, lon });
        },
        );
    }, []);


    const handleClick = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            setQuery({ lat, lon });
          });
        }
      };
   
    
        const handlekey = (e) => {
            if (e.key === "Enter") {
                if (city !== "") {
                  setQuery({ q: city });
                }
                setCity("");
                //console.log(city);
            }
        };

        const handleSearch = () => {
            if (city !== "") {
              setQuery({ q: city });
            }
          };
          
        useEffect(() => {
            let res = cities.filter((ele) => {
                return ((ele.slice(0, city.length).toLowerCase() === city) || (ele.slice(0, city.length) === city))
            })
                setData(res)
    
        },[city])

        let count = 0;

        const handleInput = (e) => {
            setCity(e.target.value)
            count = 0
        }

        const handledisplay = () =>{
            count = 1
        }

        const handleFocus = () => {
            myRef.current.style.display = "block";
          };
    return (
      <div>
          <div>
              <div className="search">
                    <div> <img onClick={handleClick} className="icon"  src={Pin} alt="location" /></div>

                    <input className="input"
                    type="text"
                    name="search"
                    value={city}
                    onFocus={handleFocus}
                    onInput={handleInput} 
                    onChange={(e)=>setCity(e.target.value)}
                    onKeyPress={handlekey}
                    placeholder="Enter City Name" 
                    />
                    
                    <button className="button" type="button">
                        <img  onClick={handleSearch}  className="icon" src={SearchIcon} alt="search" />
                    </button>

                    </div>

                    

                    {/* {
                    count === 0 &&
                <div style={{ height : "200px", width : "91%", overflow : "auto", margin : "auto"}}>
                    
                    {data.map((e) => (   
                        <div className="debounce" onClick={()=>(setCity(e),  handledisplay(), handleSearch())}>
                                <p>{e}</p>  
                        </div>    
                    ))
                   }
                </div>
            } */}
          </div>
          
      </div>
    )
}
/**? */
