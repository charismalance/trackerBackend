require('dotenv').config()


module.exports = {
  "development": {
    "username": process.env.DB_UserName,
    "password": process.env.DB_Password,
    "database": process.env.databaseName,
    "host":process.env.DB_Host,
    "dialect": process.env.DB_Dialect
  },
  "test": {
    "username": process.env.DB_UserName,
    "password": process.env.DB_Password,
    "database": process.env.databaseName,
    "host":process.env.DB_Host,
    "dialect": process.env.DB_Dialect
  },
  "production": {
    "username": process.env.DB_UserName,
    "password": process.env.DB_Password,
    "database": process.env.databaseName,
    "host":process.env.DB_Host,
    "dialect": process.env.DB_Dialect
  }
}
