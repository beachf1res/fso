require('dotenv').config({ path: './var/.env' });

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  PORT,
  MONGODB_URI,
};
