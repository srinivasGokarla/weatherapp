import { useState,useEffect } from 'react';
import '../App.css';
import Pin from '../Images/pin.png';
import SearchIcon from '../Images/Searchicon.png'
import {cities} from "./db"

export default function Search({setQuery}) {

    const [city, setCity] = useState("");

    const [debounceArr, SetDebounceArr] = useState([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setQuery({ lat, lon });
        },
        );
    }, []);


    const handleLocationClick = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            setQuery({ lat, lon });
          });
        }
      };


    // const findLocation = () => {
            
    // };     
    
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                if (city !== "") {
                  setQuery({ q: city });
                }
                setCity("");
                console.log(city);
                // console.log("Cities",Cities[1].city)
            }
        };

        const handleSearchClick = () => {
            if (city !== "") {
              setQuery({ q: city });
            }


          };


          //new debounce 

          
        useEffect(() => {
            let res = cities.filter((ele) => {
                return ((ele.slice(0, city.length).toLowerCase() === city) || (ele.slice(0, city.length) === city))
            })
                SetDebounceArr(res)
    
        },[city])

        let count = 0;

        const handleInput = (e) => {
            setCity(e.target.value)
            count = 0
        }

        const handledisplay = () =>{
            count = 1
        }


    return (
      <div>
          <div>
              <div className="SearchMain">
                    <div> <img onClick={handleLocationClick} className="LocIcon"  src={Pin} alt="location" /></div>

                    <input className="InputSearch"
                    type="text"
                    name="search"
                    // onInput={(e)=>setCity(Cities)}
                    value={city}
                    onInput={handleInput} 
                    onChange={(e)=>setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search City" 
                    // autocomplete="on"
                    />
                    
                    <button className="SearchButton" type="button">
                        <img  onClick={handleSearchClick}  className="LocIcon" src={SearchIcon} alt="search" />
                    </button>

                    </div>





                    {
                    count === 0 &&
                <div style={{ height : "200px", width : "91%", overflow : "auto", margin : "auto"}}>
                    {debounceArr.map((e) => (   
                        <div className="de_main" onClick={()=>(setCity(e),  handledisplay(), handleSearchClick())}>
                                <p>{e}</p>
                               
                               
                        </div>    
                    ))}
                </div>
            }
          </div>
          
      </div>
    )
}
