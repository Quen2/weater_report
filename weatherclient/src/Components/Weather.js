import React, { useEffect, useState } from "react";
import DetailedWeather from "./DetailedWeather";
import {MapContainer, TileLayer, Marker} from "react-leaflet"


export default function Weather ({weather, lat , lon})
{

    const [dateToLookForWeather, setDateToLookForWeather] = useState(null)

    useEffect(() => {
        if(weather)
        {
            setDateToLookForWeather(weather.daily.time[0])
        }
    },[weather])

    const weatherCode = {
        0: '☀️',
        1: '🌤️',
        2: '⛅',
        3: '☁️',
        45: '🌫️',
        48: '🌫️',
        51: '🌫️',
        53: '🌫️',
        55: '🌫️',
        56: '🌫️',
        57: '🌫️',
        61: '🌧️',
        63: '🌧️',
        65: '🌧️',
        66: '🌧️',
        67: '🌧️',
        71: '🌨️',
        73: '🌨️',
        75: '🌨️',
        77: '🌨️',
        80: '🌧️',
        81: '🌧️',
        82: '🌧️',
        85: '🌧️',
        86: '🌧️',
        95: '🌩️',
        96: '⛈️',
        99: '⛈️'
    };


    function changeDate(date) 
    {
        const newDate = new Date(date).toLocaleString('fr-FR', {
            month : 'short',
            day : 'numeric'
         })  
       return newDate; 
    }

    function changeCurrentDate(date)
    {
        const newDate = new Date(date).toLocaleString('fr-FR', {
            month : 'short',
            day : 'numeric',
            hour: 'numeric',
            minute :'numeric'
         })  
       return newDate; 
    }

    function getWeatherCode(code)
    {
        return weatherCode[code]
        
    }

    return (

        <div className="w-screen h-screen">
            {
                weather && lat && lon ?
                <div className="flex flex-col h-full">
                    <div className="text-black p-3 bg-blue-200 text-center">
                        <p>Weather_Look_up</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-evenly p-3">
                        {
                            weather.daily.time.map((value, index) => (
                                <div key={index} className="flex flex-col justify-evenly md:flex-col text-center border cursor-pointer md:w-[14.2857142857%] hover:bg-blue-100 hover:scale-105 " onClick={(event) => {setDateToLookForWeather(value)}}>
                                    <div className="flex md:flex-col justify-center gap-8 md:gap-0">
                                        <p>{changeDate(value)}</p>
                                        <p className="text-3xl"> {getWeatherCode(weather.daily.weathercode[index])} </p>
                                        <p>{Math.round(weather.daily.temperature_2m_min[index])}° - {Math.round(weather.daily.temperature_2m_max[index])}°</p>
                                    </div>
                                </div>
                            ))      
                        }
                    </div>
                    <div className="text-center w-3/4 mx-auto p-4">
                        <div className="border mb-8">
                            <p>{changeCurrentDate(weather.current_weather.time)}</p>
                            <p>Température : {weather.current_weather.temperature}°</p>
                            <p className="text-3xl">{getWeatherCode(weather.current_weather.weathercode)}</p>

                        </div>
                        <MapContainer center={[lat, lon]} zoom={17}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[lat, lon]} />
                        </MapContainer>
                    </div>
                    <div className="text-black fixed bottom-0 w-full p-3 bg-blue-200">
                        <DetailedWeather date={dateToLookForWeather} currentHour={weather.current_weather.time} />
                    </div>
                </div>
                : null
            }
        </div>
    )
}