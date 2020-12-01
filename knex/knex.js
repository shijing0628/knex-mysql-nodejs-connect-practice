var options = {
 development: {
  client: 'mysql',
  connection: {
   host: '127.0.0.1',
   user: 'root',
   password: process.env.PASSWORD,
   database: 'todoapp',
   tableName: '20201201100957_create_users_and_todos_tables',
   port: 3306
  },
  migrations: {
   directory: __dirname + '/knex/migrations',
   tableName: "20201201100957_create_users_and_todos_tables"
   //schemaName: "todoapp"
  },
  seeds: {
   directory: __dirname + '/knex/seeds',
  },
 }
};

var environment = process.env.NODE_ENV || 'development';
var config = options[environment];
module.exports = require('knex')(config);