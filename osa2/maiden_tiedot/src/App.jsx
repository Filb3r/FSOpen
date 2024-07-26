import { useEffect, useState } from 'react'
import Finder from './components/Finder'
import Countries from './components/Countries'
import Country from './services/Country'


const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    Country
      .getAll()
      .then(response => {
        setCountries(response)
      })
      .catch(error => {
        console.log(error)
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
