const express = require('express'),
  morgan = require('morgan');
  bodyParser = require('body-parser'),
  uuid = require('uuid');
  
const app = express();
app.use(bodyParser.json());
app.use(morgan('common'));

let movies = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling'
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien'
  },
  {
    title: 'Lord of the Rings: The Two Towers',
    author: 'J.R.R. Tolkien'
  },
  {
    title: 'Twilight',
    author: 'Stephanie Meyer'
  },
  {
    title: 'Shrek',
    author: 'William Steig'
  },
  {
    title: 'Shrek 2',
    author: 'William Steig'
  },
  {
    title: 'Shrek 3',
    author: 'William Steig'
  },
  {
    title: 'Toy Story',
    author: 'John Lasseter'
  },
  {
    title: 'Toy Story 2',
    author: 'John Lasseter'
  },
  {
    title: 'Toy Story 3',
    author: 'John Lasseter'
  },
];

//List of all users
let users = [
  {
    id: 1,
    name: 'John Smith',
    age: '37'
  },
  {
    id: 2,
    name: 'Mark Smith',
    age: '25'
  },
  {
    id: 3,
    name: 'John Dpe',
    age: '64'
  },
  {
    id: 4,
    name: 'user123',
    age: '69'
  },
]
// GET requests
app.use(express.static('public'));


// Welcome screen
app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});

// List of all available movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// List of all available users
app.get('/users', (req, res) => {
  res.json(users);
});

// Gets the data about a single user, by name
app.get('/users/:name', (req, res) => {
  res.json(users.find((user) =>
    { return user.name === req.params.name }));
});

// Gets the data about a movie, by name
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.title === req.params.title }));
});

app.get('/directors', (req, res) => {
  res.send('List currently unavailable. This function is coming up soon!');
});

app.get('/directors/:name', (req, res) => {
  res.send('Director not found, database not fully opperational');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

//Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('ERROR!');
  });