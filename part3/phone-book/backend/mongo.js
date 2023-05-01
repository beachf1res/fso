const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const DB_URL = `mongodb+srv://admin:${password}@cluster0.h29zfyu.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(DB_URL);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((r) => {
    console.log(r);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((r) => {
    console.log(r);
    mongoose.connection.close();
  });
}
