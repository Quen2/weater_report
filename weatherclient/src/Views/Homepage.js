import { React, useEffect, useState } from "react"
import Weather from "../Components/Weather"
import axios from "axios";

export default function Homepage ()
{

    const [weather, setWeather] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&precipitation_unit=inch&timezone=auto&models=best_match`)
            .then((result) => {
                setWeather(result.data);
                setLongitude(position.coords.longitude);
                setLatitude(position.coords.latitude);
            })
            .catch((error) => {
                console.log(error);
            })
        })
    },[])



    return (
        <div>
            <Weather weather={weather} lat={latitude} lon={longitude} ></Weather>
        </div>
    )
}