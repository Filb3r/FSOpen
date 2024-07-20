const Filter = (props) => {
    const { nameFilter, handleNameFiltering} = props

    return (
        <div>
            filter shown with
            <input value={nameFilter} onChange={handleNameFiltering}/>
        </div>
    )
}

export default Filter