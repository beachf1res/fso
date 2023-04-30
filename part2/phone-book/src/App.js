import './App.css';
import { useEffect, useState } from 'react';
import phoneBookService from './services/phoneBook.service';
import { Filter, NewPersonForm, Persons, Notification } from './components';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [shownPersons, setShownPersons] = useState(persons);
  const [notification, setNotification] = useState({
    message: '',
    isError: false,
  });

  useEffect(() => {
    phoneBookService
      .getAll()
      .then((persons) => setPersons(persons))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setShownPersons(persons);
  }, [persons]);

  function toggleNotification() {
    setTimeout(() => {
      setNotification({ message: '', isError: false });
    }, 3000);
  }

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
          .then((r) => setPersons(persons.map((p) => (p.id === r.id ? r : p))))
          .catch(() => {
            setNotification({
              isError: true,
              message: `${existingPerson.name} has been removed from database.`,
            });
            setPersons(
              setPersons(persons.filter((p) => p.id !== existingPerson.id))
            );
            toggleNotification();
          });

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
      .then((newPerson) => {
        setNotification({
          ...notification,
          message: `${newPerson.name} has been added to phonebook`,
        });
        setPersons(persons.concat(newPerson));
        toggleNotification();
      })
      .catch((e) => {
        setNotification({ message: e.message, isError: true });
        toggleNotification();
      });

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
        .then(() => setPersons(persons.filter((p) => p.id !== id)))
        .catch(() => {
          setNotification({
            isError: true,
            message: `${name} has already been removed from database.`,
          });
          setPersons(persons.filter((p) => p.id !== id));
          toggleNotification();
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={filterHandler} />
      <h2>Add a new</h2>
      <Notification notification={notification} />
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
