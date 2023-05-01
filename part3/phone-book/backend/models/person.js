const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const DB_URI = process.env.MONGODB_URI;
console.log('Connecting to', DB_URI);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => console.log('Error connecting to MongoDB ', e.message));

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
