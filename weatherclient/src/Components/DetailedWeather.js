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
        99: '⛈️',
        100 : '🌕'
    };

    function getWeatherCode(code)
    {
        return weatherCode[code]
        
    }

    return (
        <div className="flex overflow-x-scroll md:overflow-hidden md:justify-evenly w-full">
            {
                WeatherPerHours ?
                WeatherPerHours.time.map((value, index) => (
                    <div key={index} className="flex">
                        {
                            getHour(value) %2 === 0 ? 
                            <div className="w-[120px] text-center">
                                <div className="flex justify-evenly">
                                    <p>{changeDate(value)}</p>
                                    <p>{WeatherPerHours.temperature_2m[index]}°</p>
                                </div>
                                {
                                    WeatherPerHours.weathercode[index] === 0 && (Number(getHour(value)) <= 8 || Number(getHour(value)) >= 20) 
                                    ?
                                    <p className="text-3xl">{getWeatherCode(100)}</p>
                                    :
                                    <p className="text-3xl">{getWeatherCode(WeatherPerHours.weathercode[index])}</p>
                                }
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