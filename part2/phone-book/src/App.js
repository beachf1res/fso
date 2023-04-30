import './App.css';
import { useEffect, useState } from 'react';
import phoneBookService from './services/phoneBook.service';
import { Filter, NewPersonForm, Persons } from './components';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [shownPersons, setShownPersons] = useState(persons);

  useEffect(() => {
    phoneBookService
      .getAll()
      .then((persons) => setPersons(persons))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setShownPersons(persons);
  }, [persons]);

  const newPersonHandler = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      const canBeEdited = window.confirm(
        `${existingPerson.name} is already added to the phonebook, replace old number with new one?`
      );

      if (canBeEdited) {
        phoneBookService
          .updatePerson(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          })
          .then((r) => setPersons(persons.map((p) => (p.id === r.id ? r : p))));

        setNewName('');
        setNewNumber('');
      }
      return;
    }

    phoneBookService
      .createPerson({
        name: newName,
        number: newNumber,
        id: Math.floor(Math.random() * 1000 * Date.now()),
      })
      .then((newPerson) => setPersons(persons.concat(newPerson)));

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

  const personRemovalHandler = ({ name, id }) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (isConfirmed) {
      phoneBookService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)));
    }
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
      <Persons list={shownPersons} onDelete={personRemovalHandler} />
    </div>
  );
};

export default App;
