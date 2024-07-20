import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')


  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.some(person => person.name === newName)
    
    if(nameExists){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFiltering = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} 
      handleNameFiltering={handleNameFiltering}
      />

      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} 
      addName={addName} 
      newName={newName} 
      newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App