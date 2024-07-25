const Countries = ({countries, country, setCountry}) => {
    const allCountryNames = countries.map(c => c.name.common)
    const filteredCountries = allCountryNames.filter(c => c.toLowerCase().includes(country.toLowerCase()))

    const showCountry = (countryToShow) => {
        setCountry(countryToShow)
    }

    if (filteredCountries.length < 10 && filteredCountries.length > 1){
        const countriesToShow = filteredCountries.slice(0,10)

        return(
            <div>
                <ul>
                {countriesToShow.map(filteredCountry => (
                    <li key={filteredCountry}>{filteredCountry} <button onClick={() => showCountry(filteredCountry)}>show</button> </li>
                    ))}
                </ul>
            </div>
        )
    } else if (filteredCountries.length === 1){
        
        const findCountry = countries.find(cc => cc.name.common === filteredCountries[0])

        return(
            <div>
                <h1>{filteredCountries}</h1>
                <p>Capital {findCountry.capital}</p>
                <p>Area {findCountry.area}</p>
                <b>languages: </b>
                <ul>
                    {Object.values(findCountry.languages).map(language => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
                <img src={findCountry.flags.png} alt="flag"/>
            </div>
        )
    }
        
    if(country){
        return(
            <div>
            Too many matches, specify another filter.
            </div>
        )
    }
}

export default Countries