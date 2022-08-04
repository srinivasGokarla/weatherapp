import React from 'react'

export default function Map({
    weather,
    weather: {  main, name, temp, timezone },
  }) {
    let cityName = weather.name
  return (
    <div>
  <div style={{padding:'5px'}}>
                    <iframe
                        title={cityName}
                        src={`https://maps.google.com/maps?q=${cityName}=&z=13&ie=UTF8&iwloc=&output=embed`}
                        
                        border="0" 
                        width="100%" 
                        height="450" 
                        style={{border:"0"}}
                    />
                </div>
    </div>
  )
}
