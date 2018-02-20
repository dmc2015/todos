const express = require('express');
const parser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.use(parser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

let todos = [
  {
    id: 1,
    title: 'Wash the dishes',
    complete: false
  },
  {
    id: 2,
    title: 'Feed the dog',
    complete: false
  },
  {
    id: 3,
    title: 'Take out the trash',
    complete: false
  }
];

// get all to dos
app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.get('/new', (req, res) => {
  res.render('todos/new');
});

// create a new to do
app.post('/', (req, res) => {
  todos.push({
    id: todos.length,
    title: req.body.title,
    complete: false
  });

  res.redirect('/');
});

// get a specific to do
app.get('/:id', (req, res) => {
  let todo = todos.find(todo => todo.id === parseInt(req.params.id));
  console.log(todo)
  res.render('todos/show', todo);
});

// edit a specific to do
app.get('/edit/:id', (req, res) => {
  let todo = todos.find(todo => todo.id === parseInt(req.params.id));
  res.render('todos/edit', todo);
});

// update a specific to do
app.put('/:id', (req, res) => {
  todos = todos.map(todo => {
    if (todo.id === parseInt(req.params.id)) {
      todo.complete = req.body.complete;
      todo.title = req.body.title;
    }

    return todo;
  });

  res.redirect('/');
});

// delete a specific to do
app.delete('/:id', (req, res) => {
  todos = todos.filter(todo => !(todo.id === parseInt(req.params.id)))

  res.redirect('/')
});

app.listen(3000, () => console.log('server is running!'));
