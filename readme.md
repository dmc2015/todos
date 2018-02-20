# Express Mongoose To Do

Let's refactor this To Do list application to use a database! The application is currently storing all of the to do items inside of an array. If we restart our server, all our to dos will be lost! (I wonder if that means we don't have to do them anymore … 🤔). Let's refactor this application to save our to dos in a Mongo database using Mongoose.

## Step 1: Database Setup

- make a `db/` directory and add the following files to it:

```bash
mkdir db
touch db/{connection,schema,seed}.js
touch db/seeds.json
```

We're going to put all our database connection and setup code inside the `db/` directory so it's organized. We'll establish our database connection inside of `connection.js`, define our schema (more on that later) inside of `schema.js` and then write a script to seed our database inside of `seed.js`. The seed data will come from `seed.json`

**`connection.js`**

The `connection`.js` file is where we'll establish a connection to our databse from our Express application:

```js
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/todo");

mongoose.Promise = Promise;

module.exports = mongoose;
```

**`schema.js`**

`schema.js` is where we'll define the structure (schema) for objects stored in our database.

```js
const mongoose = require("./connection");

const ToDoSchema = new mongoose.Schema({
  title: String,
  complete: Boolean
});

const Todo = mongoose.model("Todo", ToDoSchema);

module.exports = Todo;
```

**`seed.js`**

We want to start off with a couple of to do items already in our database, so we'll create a script to insert some dummy data. This is called `seeding` the database.

```js
const Todo = require("./schema");
const seedData = require("./seeds.json");

Todo.remove({})
  .then(() => {
    return Todo.collection.insert(seedData);
  })
  .then(() => {
    process.exit();
  });
```

**`seeds.json`**

Our seed to do items look like this:

```json
[
  {
    "title": "Wash the dishes",
    "complete": false
  },
  {
    "title": "Feed the dog",
    "complete": false
  },
  {
    "title": "Take out the trash",
    "complete": false
  }
]
```

## Step 2: Displaying your To Do list from your database (Read)

Our root route (`/`) currently renders the `todos` array inside our handlebars template. We want to modify it so that it is rendering the items inside of our database. To do that, we'll query our database and then render the results of the query:

```js
// ...
const Todo = require('./db/schema')

// ...

app.get('/', (req, res) => {
  Todo.find({})
    .then(todos => {
      res.render('index', { todos });
    })
    .catch(err => console.log(err))
});

/// ...
```

## Step 3: Create

Our form is already set up to submit a new to do to our Express server. The route for that currently just pushes a new to do object into the `todos` array though! We want to save these to the database. We do that with the `.create()` method:

```js
app.post('/', (req, res) => {
  Todo.create(req.body)
    .then(todo => {
      res.redirect('/');
    })
});
```

`.create()` takes an object and stores it in the database.

## Step 4: Update

Updating a to do has two steps: first, we need to get the to do that the user wants to update and render a form to update that todo; second, when the user submits that form, we update that to do in the `todos` array. We want to modify these two routes so that they read and update the to do saved in the database:

```js
app.get('/edit/:id', (req, res) => {
  Todo.findOne({_id: req.params.id})
    .then(todo => {
      res.render("todos/edit", todo);
    })
});

app.put('/:id', (req, res) => {
  Todo.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    .then(todo => {
      res.redirect('/')
    })
});
```

The first route above queries the database using `.findOne()` to find a record with the same `_id` as the id passed in via `params`. We then render that to do to the user. When the user submits the form in the `edit` view, we use the `findOneAndUpdate()` method to find and update a record in a single operation.

## Step 5: Delete

When a user wants to delete a record, we can use the `.findOneAndRemove()` to find and remove that record in a single operation:

```js
app.delete('/:id', (req, res) => {
  Todo.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.redirect('/')
    })
});
```