import React from "react";

export default function Weather ({weather})
{

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

    function getWeatherCode(code)
    {
        return weatherCode[code]
        
    }

    return (

        <div className="flex border w-screen h-screen justify-center items-center">
            {
                weather ?
                <div className="flex flex-col border gap-10">
                    <div className="border text-center">
                        <p>{changeDate(weather.current_weather.time)}</p>
                        <p>Température : {weather.current_weather.temperature}°</p>
                        <p>{getWeatherCode(weather.current_weather.weathercode)}</p>
                    </div>
                    <div className="border flex">
                        {
                            weather.daily.time.map((value, index) => (
                                <div key={index} className="flex flex-col text-center">
                                    <p>{changeDate(value)}</p>
                                    <p>{Math.round(weather.daily.temperature_2m_min[index])}° - {Math.round(weather.daily.temperature_2m_max[index])}°</p>
                                    <p> {getWeatherCode(weather.daily.weathercode[index])} </p>
                                </div>
                            ))      
                        }
                    </div>   
                </div>
                : null
            }
        </div>
    )
}