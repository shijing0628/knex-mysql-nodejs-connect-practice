const express = require('express')
const app = express()
const knex = require('./knex/knex');
const path = require('path')
const knex_populate = require('knex-populate')
// this following for test connect to mysql db
// var knex = require('knex')({
//  client: 'mysql',
//  connection: {
//   host: '127.0.0.1',
//   user: 'root',
//   password:  process.env.PASSWORD,
//   database: 'todoapp',
//   tableName: '20201201100957_create_users_and_todos_tables',
//   port: 3306
//  }
// });
//middleware
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')



//routes
//get  from mysql db
app.get('/todos', (req, res) => {
 // use the knex variable above to create dynamic queries
 knex.select('*').from('todos').then(function (todos) {
  res.send(todos)
 })
});

//knex pupluate connect two tables 
app.get('/test', (req, res, next) => {
 knex_populate(knex, 'todos')
  .find()
  .populate('users', 'user_id', 'name')
  .exec()
  .then(results => res.send(results));
})

app.get('/todos/:id', function (req, res) {
 knex.select()
  .from('todos')
  .where('id', req.params.id)
  .then(function (todos) {
   res.send(todos);
  })
})



//insert one todo to db
app.post('/todos', (req, res) => {
 knex('todos').insert({
  title: req.body.title,
  user_id: req.body.user_id
 }).then(function () {
  knex.select('*').from('todos').then(function (todos) {
   res.send(todos)
  })
 })
})


//update todo one item  to db
app.put('/todos/:id', function (req, res) {
 knex('todos').where('id', req.params.id)
  .update({
   title: req.body.title,
   completed: req.body.completed
  })
  .then(function () {
   knex.select()
    .from('todos')
    .then(function (todos) {
     res.send(todos);
    })
  })
})

//delete one item to db
app.delete('/todos/:id', function (req, res) {
 knex('todos').where('id', req.params.id)
  .del()
  .then(function () {
   knex.select()
    .from('todos')
    .then(function (todos) {
     res.send(todos);
    })
  });
})


//joins in mysql
app.get('/todos-of-user/:id', function (req, res) {
 knex.from('todos')
  .innerJoin('users', 'todos.user_id', 'users.id')
  .where('todos.user_id', req.params.id)
  .then(function (data) {
   res.send(data)
  })
})


app.listen(4000, () => {
 console.log('listening on the port : 4000...')
})