const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema ({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movie'}]
});

let directorSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Bio: {type: String, required: true},
    Birthday: Date,
  });
  
  let genreSchema = mongoose.Schema({
      Name: { type: String, required: true},
      Description:{ type: String, required: true}
  });

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model ('User', userSchema);
let Director = mongoose.model('director', directorSchema);
let Genre = mongoose.model('genre', genreSchema)


module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
