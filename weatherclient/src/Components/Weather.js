import React, { useEffect, useState } from "react";
import DetailedWeather from "./DetailedWeather";
import {MapContainer, TileLayer, Marker} from "react-leaflet"
import axios from "axios";

export default function Weather ({weather, lat , lon})
{

    const [dateToLookForWeather, setDateToLookForWeather] = useState(null)
    const [actualWeather , setActualWeather] = useState(weather)
    const [city, setCity] = useState('Paris');
    const [latitude, setLatitude] = useState(lat);
    const [longitude, setLongitude] = useState(lon);
    const [actualCity, setActualCity] = useState(null);

    useEffect(() => {
        if(actualWeather)
        {
            setDateToLookForWeather(actualWeather.daily.time[0])
        }
        },[actualWeather])

    useEffect(() => {
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&precipitation_unit=inch&timezone=auto&models=best_match`)
            .then((result) => {
                setActualWeather(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },[latitude, longitude])

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

    function getLatAndLong (e)
    {
        e.preventDefault()
        axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
            headers : {
                'X-Api-Key' : 'DSqe1+Z7F0/t/tGrH9J/hQ==V38Otpf1819fmgbg'
            }
        })
        .then((response) => {
            setActualCity(response.data[0].name)
            setLatitude(response.data[0].latitude);
            setLongitude(response.data[0].longitude);
        })
        .catch ((error) => {
            console.log(error);
        })
        
    }

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
                actualWeather && lat && lon ?
                <div className="flex flex-col h-full">
                            <div className="text-black w-full border bg-blue-100 text-center">
                                <p>Weather_Look_up</p>
                            </div>
                    <div className="flex flex-col md:flex-row justify-evenly p-3">
                        {
                            actualWeather.daily.time.map((value, index) => (
                                <div key={index} className="flex flex-col justify-evenly md:flex-col text-center border cursor-pointer md:w-[14.2857142857%] hover:bg-blue-100 hover:scale-105 " onClick={(event) => {setDateToLookForWeather(value)}}>
                                    <div className="flex md:flex-col justify-center gap-8 md:gap-0">
                                        <p>{changeDate(value)}</p>
                                        <p className="text-3xl"> {getWeatherCode(actualWeather.daily.weathercode[index])} </p>
                                        <p>{Math.round(actualWeather.daily.temperature_2m_min[index])}° - {Math.round(actualWeather.daily.temperature_2m_max[index])}°</p>
                                    </div>
                                </div>
                            ))      
                        }
                    </div>
                    <div className="text-center w-3/4 mx-auto p-4">
                        <div className="border mb-8">
                            <p>{actualCity}</p>
                            <p>{changeCurrentDate(actualWeather.current_weather.time)}</p>
                            <p>Température : {actualWeather.current_weather.temperature}°</p>
                            <p className="text-3xl">{getWeatherCode(actualWeather.current_weather.weathercode)}</p>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <form className="flex flex-col gap-4 justify-center">
                                <input 
                                    onChange={(e) => {setCity(e.target.value)}}
                                    placeholder="Ville à rechercher"
                                    className="text-center border"
                                />
                                <button type="submit" className="border" onClick={(e) => {getLatAndLong(e)}}>Rechercher</button>
                            </form>
                            <MapContainer center={[latitude, longitude]} zoom={5}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[latitude, longitude]} />
                            </MapContainer>
                        </div>
                    </div>
                    <div className="text-black fixed bottom-0 w-full p-3 bg-blue-200">
                        <DetailedWeather date={dateToLookForWeather} />
                    </div>
                </div>
                : null
            }
        </div>
    )
}