import React, { useEffect, useState } from "react";
import DetailedWeather from "./DetailedWeather";

export default function Weather ({weather})
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
                weather ?
                <div className="flex">
                    <div className="text-black w-1/2 md:w-5/6 ml-auto fixed top-0 right-0 p-3 bg-slate-500 text-center">
                        <p>Weather_Look_up</p>
                    </div>
                    <div className="flex flex-col justify-evenly h-screen bg-slate-500 p-3 w-1/2 md:w-1/6">
                        {
                            weather.daily.time.map((value, index) => (
                                <div key={index} className="flex flex-col text-center border cursor-pointer" onClick={(event) => {setDateToLookForWeather(value)}}>
                                    <p>{changeDate(value)}</p>
                                    <p>{Math.round(weather.daily.temperature_2m_min[index])}° - {Math.round(weather.daily.temperature_2m_max[index])}°</p>
                                    <p> {getWeatherCode(weather.daily.weathercode[index])} </p>
                                </div>
                            ))      
                        }
                    </div>
                    <div className="text-center h-fit self-center w-1/2 md:w-fit mx-auto border p-4">
                        <p>{changeCurrentDate(weather.current_weather.time)}</p>
                        <p>Température : {weather.current_weather.temperature}°</p>
                        <p>{getWeatherCode(weather.current_weather.weathercode)}</p>
                    </div>
                    <div className="text-black w-1/2 md:w-5/6 ml-auto fixed bottom-0 right-0 p-3 bg-slate-500">
                        <DetailedWeather date={dateToLookForWeather} />
                    </div>
                </div>
                : null
            }
        </div>
    )
}