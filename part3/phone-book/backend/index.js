require('dotenv').config({ path: './vars/.env' });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/person');

const PORT = process.env.PORT;

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

function generateId() {
  return Math.floor(Math.random() * 100 * Date.now());
}

const app = express();
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(cors());
app.use(express.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(express.static('build'));

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
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((e) => {
      console.error(e);
      res.status(400).send({ error: 'Malformed id' });
    });
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

  const person = new Person({
    name: reqPerson.name,
    number: reqPerson.number,
  });

  person.save().then((savedPerson) => res.json(savedPerson));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
