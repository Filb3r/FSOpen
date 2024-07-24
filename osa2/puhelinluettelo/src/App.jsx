import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const nameExists = persons.find(person => person.name === newName)
    
    if(!nameExists){
      personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
    } else {
      if (window.confirm(`${nameObject.name} is already added, do you want to replace old number with a new one?`)){
        personService
          .updateName(nameExists.id, nameObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== nameExists.id ? person : response))
          })
    }
  }
  }

  const deleteName = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}`)){
      personService
      .deleteId(person.id)
      setPersons(persons.filter(n => n.id !== person.id))
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
      <Persons personsToShow={personsToShow} deleteName={deleteName}/>
    </div>
  )
}

export default App