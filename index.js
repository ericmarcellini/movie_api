const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let allMovies = [
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
let allUsers = [
  {
    Name: 'John Smith',
    age: '37'
  }
// GET requests
app.use(express.static('public'));


// Welcome screen
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

// List of all available movies
app.get('/movies', (req, res) => {
  res.json(allMovies);
});

// List of all available users
app.get('/users', (req, res) => {
  res.json(allUsers);
});

// Gets the data about a single user, by name
app.get('/users/:name', (req, res) => {
  res.json(user.find((user) =>
    { return user.name === req.params.name }));
});

// Gets the data about a movie, by name
app.get('/movie/:name', (req, res) => {
  res.json(movie.find((user) =>
    { return movie.name === req.params.name }));
});

// Deletes a user from our list by ID
app.delete('/users/:id', (req, res) => {
  let user = user.find((user) => { return user.id === req.params.id });

  if (user) {
    users = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('User ' + req.params.id + ' was deleted.');
  }
});

// Deletes a movie from our list by ID
app.delete('/movies/:id', (req, res) => {
  let movie = movie.find((user) => { return movie.id === req.params.id });

  if (movie) {
    movies = movies.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('The film ' + req.params.id + ' was deleted.');
  }
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