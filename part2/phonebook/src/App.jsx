import { useState, useEffect } from 'react'
import {Persons, PersonForm, Filter, Notification, Error } from './components/Components'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearchInput, setNewSearchInput] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    //console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  //console.log('render', persons.length, 'persons')

  const handleAddPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    //console.log(person)
    if (person) {
      if (person.number === newNumber) {
        alert(`${newName} with the number ${newNumber} is already added to phonebook`)
      } else if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {        
        const changedPerson = {...person, number: newNumber}
        personService
            .update(changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setErrorMessage(
                `Information of '${person.name}' was already removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== person.id))
            })
         
      } else {
        return
      }  
      
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        
    }
  }

  const handleRemovePerson = id => {
    const person = persons.find(p => p.id ===id).name
    if (window.confirm(`Delete ${person}?`)) {
      const filteredPersons = persons.filter(person => person.id !== id)
      personService
        .remove(id)
        .then(removedPerson => {
          console.log(`Deleted ${removedPerson.name} from the database`)
          setPersons(filteredPersons)
          setNotificationMessage(`Deleted ${removedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${person.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(filteredPersons)
        })
    } else {
      return
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewSearchInput(event.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter searchInput={newSearchInput} handleFilter={handleFilterChange} />    
      <h3>add a new</h3>
        <PersonForm 
          submitForm={handleAddPerson}
          name={newName} 
          number={newNumber} 
          handleName={handleNameChange} 
          handleNumber={handleNumberChange}
        />
      <h3>Numbers</h3>
        <Persons persons={persons} searchInput={newSearchInput} handleRemove={handleRemovePerson} />
    </div>
  )
}

export default App