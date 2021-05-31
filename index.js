const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let top10Movies = [
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

// GET requests
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/movies', (req, res) => {
  res.json(top10Movies);
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