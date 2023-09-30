import React, {useState, useEffect} from "react";
import axios from "axios";

export default function DetailedWeather ({date})
{

    const [WeatherPerHours, setWeatherPerHours] = useState(null);

    useEffect(() => {
        if(date)
        {
            navigator.geolocation.getCurrentPosition((position) => {
                axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,weathercode&start_date=${date}&end_date=${date}&precipitation_unit=inch&timezone=auto&models=best_match`)
                .then((result) => {
                    console.log(result.data.hourly);
                    setWeatherPerHours(result.data.hourly)
                })
                .catch((error) => {
                    console.log(error);
                })
            })
        }
    },[date])

    function changeDate(date)
    {
        const newDate = new Date(date).toLocaleString('fr-FR', {
            hour: 'numeric',
            minute :'numeric'
         })  
       return newDate; 
    }

    function getHour(date)
    {
        const newDate = new Date(date).toLocaleString('fr-FR', {
            hour: '2-digit'
         })  
       return newDate.substring(0,2); 
    }

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

    function getWeatherCode(code)
    {
        return weatherCode[code]
        
    }

    return (
        <div className="flex justify-evenly">
            {
                WeatherPerHours ?
                WeatherPerHours.time.map((value, index) => (
                    <div key={index} className="flex">
                        {
                            getHour(value) %2 === 0 ? 
                            <div>
                                <p>{changeDate(value)}</p>
                                <p>{WeatherPerHours.temperature_2m[index]}°</p>
                                <p>{getWeatherCode(WeatherPerHours.weathercode[index])}</p>
                            </div>
                            : null
                        }
                    </div>
                )) 
                : null
            }
        </div>
    )
}