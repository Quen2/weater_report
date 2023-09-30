import React from "react";

export default function Weather ({weater})
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
          year : "numeric",
          month : "long",
          day : "numeric"
       })  
       return newDate; 
    }

    function getWeatherCode(code)
    {
        return weatherCode[code]
        
    }

    return (

        <div className="flex">
            {
                weater ?
                <div className="flex">
                    <div>
                        {
                            weater.time.map((value, index) => (
                                <div key={index}>
                                    <p>Temps : {changeDate(value)}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                    {
                        weater.temperature_2m_min.map((value, index) => (
                            <div key={index}>
                                <p>Température : {value}°</p>
                            </div>
                        ))                    
                    }
                    </div>
                    <div>
                    {
                        weater.temperature_2m_max.map((value, index) => (
                            <div key={index}>
                                <p> -  {value}°</p>
                            </div>
                        ))                    
                    }
                    </div>
                    <div>
                    {
                        weater.weathercode.map((value, index) => (
                            <div key={index}>
                                <p> {getWeatherCode(value)} </p>
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