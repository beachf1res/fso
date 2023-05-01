require('dotenv').config({ path: './vars/.env' });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const PORT = process.env.PORT;

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

app.get('/info', async (req, res) => {
  const persons = await Person.find({});

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

app.put('/api/persons/:id', (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((e) => next(e));
});

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch((e) => next(e));
});

app.post('/api/persons', (req, res, next) => {
  const { body: reqPerson } = req;

  const person = new Person({
    name: reqPerson.name,
    number: reqPerson.number,
  });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((e) => next(e));
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

  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
