const Finder = ({country, handleCountryChange}) => {
    return (
        <p>find countries
            <input value={country} onChange={handleCountryChange}/>
        </p>
    )
}

export default Finder