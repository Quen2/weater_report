import { React, useState } from "react"
import Weather from "../Components/Weather"
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Homepage ()
{

    const [accepted, setAccepted] = useState(null);
    const [weather, setWeather] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);

    function acceptLocation ()
    {
        setAccepted(true)
        setTimeout(() => {
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
        }, 1500);
    }

    function refuseLocation ()
    {
        setAccepted(true)
        setTimeout(() => {
            axios.get(`https://api.open-meteo.com/v1/forecast?latitude=48.8534&longitude=2.3488&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&precipitation_unit=inch&timezone=auto&models=best_match`)
            .then((result) => {
                setWeather(result.data);
                setLatitude(48.8534);
                setLongitude(2.3488);
            })
            .catch((error) => {
                console.log(error);
            })
        }, 1500);
    }

    return (
        <div>
            {
                weather ? 
                <Weather weather={weather} lat={latitude} lon={longitude} ></Weather>
                :
                <div>
                    <Header />
                    <div className="bg-blue-100 flex text-center w-screen h-screen items-center justify-center">
                        {
                            accepted ? 
                            <div>
                                <p>Merci pour votre confiance</p>
                            </div>
                            :
                            <div>
                                <p>Ce site demande votre position afin de récupérer efficacement les données météorologiques autour de vous </p>
                                <p className="border p-2 cursor-pointer w-fit mx-auto hover:bg-blue-200 hover:scale-105" onClick={acceptLocation}>Accepter ?</p>
                                <p className="border p-2 cursor-pointer w-fit mx-auto hover:bg-blue-200 hover:scale-105" onClick={refuseLocation}>Refuser</p>
                            </div>
                        }
                    </div>
                    <Footer />
                </div>
            }
        </div>
    )
}