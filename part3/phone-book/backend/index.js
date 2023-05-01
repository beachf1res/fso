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
const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body'
);

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(requestLogger);

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

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((e) => next(e));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch((e) => next(e));
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

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Uknown Endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
