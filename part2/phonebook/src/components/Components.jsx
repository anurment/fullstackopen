const Persons = ({ persons, searchInput, handleRemove }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()))
  return(
  <div>
    <ul>    
        {filteredPersons.map(person => 
            <Person 
              key={person.id} 
              person={person} 
              handleRemove={() => handleRemove(person.id)}   
            />
        )}
    </ul>  
  </div>  
  )
}

const Person = ({person, handleRemove}) => (
  <li>
    {person.name} {person.number}
    <button onClick={handleRemove}>delete</button>
  </li>
)

const PersonForm = (props) => (
  <form onSubmit={props.submitForm}>
    <div>name:
      <input
        value={props.name}
        onChange={props.handleName} 
      />
    </div>

    <div>number:
      <input
        value={props.number}
        onChange={props.handleNumber}
      />
    </div>
    <div>
      <button type="sumbit">add</button>
    </div>
  </form>

)

const Filter = (props) => (  
  <div>
    filter shown with
    <input type='text'
      value={props.searchInput}
      onChange={props.handleFilter}
    />
  </div>
)

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export {Persons, PersonForm, Filter, Notification, Error}
