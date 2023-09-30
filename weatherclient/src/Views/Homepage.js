import { React, useEffect, useState } from "react"
import Weather from "../Components/Weather"
import axios from "axios";

export default function Homepage ()
{

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&precipitation_unit=inch&timezone=auto&models=best_match`)
            .then((result) => {
                console.log(result.data);
                setWeather(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
        })
    },[])



    return (
        <div>
            <p className="bg-gray-400">Weather_Report</p>
            <Weather weather={weather} ></Weather>
        </div>
    )
}