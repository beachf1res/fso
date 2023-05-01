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
  name: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minLength: 8,
    maxLength: 30,
    required: true,
    validator: function (v) {
      return /^\+?[0-9]{3}-?[0-9]{6,12}$/.test(v);
    },
    message: (props) => `${props.value} is not a valid phone number`,
  },
});

personSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
