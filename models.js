// Import mongoose and bcrypt libraries
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for a movie
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true}, // Movie title
    Description: {type: String, required: true}, // Movie description
    Genre: {
        Name: String, // Genre name
        Description: String // Genre description
    },
    Director: {
        Name: String, // Director name
        Bio: String // Director biography
    },
    ImagePath: String, // Path to the movie's image
    Featured: Boolean // Whether the movie is featured
});

// Define the schema for a user
let userSchema = mongoose.Schema ({
    Username: {type: String, required: true}, // User's username
    Password: {type: String, required: true}, // User's password
    Email: {type: String, required: true}, // User's email
    Birthday: Date, // User's birthday
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}] // Array of favorite movies
});

// Static method to hash a password
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

// Instance method to validate a password
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
};

// Define the schema for a director
let directorSchema = mongoose.Schema({
    Name: {type: String, required: true}, // Director's name
    Bio: {type: String, required: true}, // Director's biography
    Birthday: Date, // Director's birthday
});

// Define the schema for a genre
let genreSchema = mongoose.Schema({
    Name: { type: String, required: true}, // Genre name
    Description:{ type: String, required: true} // Genre description
});

// Create models from the schemas
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Director = mongoose.model('Director', directorSchema);
let Genre = mongoose.model('Genre', genreSchema);

// Export the models
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
