const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development:{
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORTA,
    dialect: 'postgres', 
    logging: true
  },
  test:{
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORTA,
    dialect: 'postgres', 
    logging: true
  },
  production:{

  }
}