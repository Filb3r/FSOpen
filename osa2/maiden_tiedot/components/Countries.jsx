const Countries = ({countries, country}) => {
    console.log(country)
    const filteredCountries = countries.filter(c => c.toLowerCase().includes(country.toLowerCase()))
/*
if >10 then: 
const countriesToShow = filteredCountries.slice(0, 10);
<ul>
countriestoshow.map((country) => )
<li key{country.name}> c</li>
*/
    
    return(
        console.log(filteredCountries)
    )
}

export default Countries