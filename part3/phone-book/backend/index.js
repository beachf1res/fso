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
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId++;
}

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
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

  if (!reqPerson.name) {
    return res.status(400).json({
      error: 'Person name is missing',
    });
  }

  if (!reqPerson.number) {
    return res.status(400).json({
      error: 'You have to specify a number for a person',
    });
  }

  reqPerson.id = generateId();
  persons.concat(reqPerson);

  res.json(reqPerson);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
