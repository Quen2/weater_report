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
        0: 'Ciel dégagé',
        1: 'Principalement dégagé',
        2: 'Partiellement nuageux',
        3: 'Ciel couvert',
        45: 'Brouillard avec dépôt de givre',
        48: 'Brouillard avec dépôt de givre',
        51: 'Bruine : Légère intensité',
        53: 'Bruine : Intensité modérée',
        55: 'Bruine : Intensité dense',
        56: 'Bruine verglaçante : Légère intensité',
        57: 'Bruine verglaçante : Intensité dense',
        61: 'Pluie : Légère intensité',
        63: 'Pluie : Intensité modérée',
        65: 'Pluie : Forte intensité',
        66: 'Pluie verglaçante : Légère intensité',
        67: 'Pluie verglaçante : Forte intensité',
        71: 'Chute de neige : Légère intensité',
        73: 'Chute de neige : Intensité modérée',
        75: 'Chute de neige : Forte intensité',
        77: 'Grésil',
        80: 'Averses de pluie : Légère intensité',
        81: 'Averses de pluie : Intensité modérée',
        82: 'Averses de pluie : Violente intensité',
        85: 'Averses de neige : Légère intensité',
        86: 'Averses de neige : Forte intensité',
        95: 'Orage : Légère ou modérée intensité',
        96: 'Orage avec grêle légère',
        99: 'Orage avec grêle forte'
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
                    <div className="text-black p-3 bg-slate-500 text-center">
                        <p>Weather_Look_up</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-evenly bg-slate-500 p-3">
                        {
                            weather.daily.time.map((value, index) => (
                                <div key={index} className="flex flex-row justify-evenly md:flex-col text-center border cursor-pointer md:w-[14.2857142857%] hover:bg-slate-700 hover:scale-105 " onClick={(event) => {setDateToLookForWeather(value)}}>
                                    <p>{changeDate(value)}</p>
                                    <p>{Math.round(weather.daily.temperature_2m_min[index])}° - {Math.round(weather.daily.temperature_2m_max[index])}°</p>
                                    <p> {getWeatherCode(weather.daily.weathercode[index])} </p>
                                </div>
                            ))      
                        }
                    </div>
                    <div className="text-center w-3/4 mx-auto p-4">
                        <div className="border mb-8">
                            <p>{changeCurrentDate(weather.current_weather.time)}</p>
                            <p>Température : {weather.current_weather.temperature}°</p>
                            <p>{getWeatherCode(weather.current_weather.weathercode)}</p>
                        </div>
                        <MapContainer center={[lat, lon]} zoom={16}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[lat, lon]} />
                        </MapContainer>
                    </div>
                    <div className="text-black fixed bottom-0 w-full p-3 bg-slate-500">
                        <DetailedWeather date={dateToLookForWeather} currentHour={weather.current_weather.time} />
                    </div>
                </div>
                : null
            }
        </div>
    )
}