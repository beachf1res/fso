import './App.css';
import { useEffect, useState } from 'react';
import { Filter, NewPersonForm, Persons } from './components';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [shownPersons, setShownPersons] = useState(persons);

  useEffect(() => {
    setShownPersons(persons);
  }, [persons]);

  const newPersonHandler = (e) => {
    e.preventDefault();
    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} have been already added`);
      setNewName('');
      return;
    }

    setPersons(
      [...persons].concat({
        name: newName,
        number: newNumber,
        id: Math.floor(Math.random() * 1000 * Date.now()),
      })
    );

    setNewName('');
    setNewNumber('');
  };

  const filterHandler = ({ target }) => {
    const filterVal = target.value.trim().toLowerCase();
    setFilter(filterVal);

    if (filterVal === '') {
      setShownPersons([...persons]);
    }

    setShownPersons(
      persons.filter(
        (p) =>
          p.name.toLowerCase().startsWith(filterVal) ||
          p.name.toLowerCase().includes(filterVal)
      )
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={filterHandler} />
      <h2>Add a new</h2>
      <NewPersonForm
        newName={newName}
        newNumber={newNumber}
        onNewNameChange={setNewName}
        onNewNumberChange={setNewNumber}
        onSubmit={newPersonHandler}
      />
      <h2>Numbers</h2>
      <Persons list={shownPersons} />
    </div>
  );
};

export default App;
