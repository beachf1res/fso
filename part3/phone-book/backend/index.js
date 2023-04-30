const express = require('express');

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const PORT = 3001;

function generateId() {
  return Math.floor(Math.random() * 100 * Date.now());
}

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/info', (req, res) => {
  res.send(
    `<div><h1>Phonebook has info about ${
      persons.length
    } people</h1><p>${new Date().toLocaleDateString()}</p></div>`
  );
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const person = persons.find((p) => p.id === Number(id));

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  persons = persons.filter((p) => p.id !== Number(id));

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { body: reqPerson } = req;

  if (!reqPerson.name && !reqPerson.number) {
    return res.status(400).json({
      error: `Person's name and/or number are missing`,
    });
  }

  if (persons.find((p) => p.name === reqPerson.name)) {
    return res.status(400).json({
      error: 'Name must be unique',
    });
  }

  reqPerson.id = generateId();
  persons.concat(reqPerson);

  res.json(reqPerson);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
