require('dotenv').config();

const origin = [
  'https://',
];

if (process.env.NODE_ENV !== 'production') {
  origin.push('http://localhost:3001');
}

const {
  PORT = 3000,
  JWT_TOKEN_KEY = 'jwt-secret-key',
  COOKIE_TOKEN_KEY = 'token',
  MONGODB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

module.exports = {
  origin,
  PORT,
  JWT_TOKEN_KEY,
  COOKIE_TOKEN_KEY,
  MONGODB,
};
