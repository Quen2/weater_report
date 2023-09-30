import { React, useEffect, useState } from "react"
import Weather from "../Components/Weather"
import axios from "axios";

export default function Homepage ()
{

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&precipitation_unit=inch&timezone=Europe%2FLondon&models=ecmwf_ifs04`)
            .then((result) => {
                console.log(result.data);
                setWeather(result.data.daily);
            })
            .catch((error) => {
                console.log(error);
            })
        })
    },[])



    return (
        <div>
            <p className="bg-gray-400">Weather_Report</p>
            <Weather weater={weather} ></Weather>
        </div>
    )
}