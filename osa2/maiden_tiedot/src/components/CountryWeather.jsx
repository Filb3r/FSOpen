import { useEffect, useState } from "react"
import Weather from '../services/Weather'

const CountryWeather = ({country}) => {
    const [countryWeat, setCountryWeat] = useState([])

    useEffect(() => {
        Weather
            .getWeather((country.latlng[0]), (country.latlng[1]))
            .then(response =>
                setCountryWeat(response.current)
            )
            .catch(error => {
                console.log(error)
            })
    }, [country.latlng])

    return(
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {countryWeat.temperature_2m} Celcius</p>
            <p>wind {countryWeat.wind_speed_10m} m/s</p>
        </div>
    )
}

export default CountryWeather