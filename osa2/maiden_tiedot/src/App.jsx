import { useEffect, useState } from 'react'
import Finder from '../components/Finder'
import axios from 'axios'
import Countries from '../components/Countries'


const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        //console.log(response.data)
        //const countryNames = response.data.map(country => country.name.common)
        setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    event.preventDefault()

    setCountry(event.target.value)
  }

  return (
    <div>
    <Finder country={country} handleCountryChange={handleCountryChange}/>
    <Countries countries={countries} country={country} setCountry={setCountry}/>
    </div>
  )
}

export default App
