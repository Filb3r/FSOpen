const Persons = ({ personsToShow, deleteName }) => {
    return (
        <div>
            {personsToShow.map((person) => 
            <p key={person.name}>{person.name} {person.number}
            <button onClick={() => deleteName(person)}>delete</button></p>
            )}
        </div>
    )}

export default Persons