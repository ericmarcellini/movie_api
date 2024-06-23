// Import necessary modules
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

// Configure the local strategy for username and password authentication
passport.use(new LocalStrategy({
  usernameField: 'Username', // Field name for username
  passwordField: 'Password' // Field name for password
}, (username, password, callback) => {
  console.log(username + '  ' + password);
  // Find the user by username
  Users.findOne({ Username: username }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }

    if (!user) {
      console.log('incorrect username');
      return callback(null, false, { message: 'Incorrect username or password.' });
    }

    // Validate the password
    if (!user.validatePassword(password)) {
      console.log('incorrect password');
      return callback(null, false, { message: 'Incorrect password.' });
    }

    console.log('finished');
    return callback(null, user);
  });
}));

// Configure the JWT strategy for token-based authentication
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Extract JWT from the authorization header
  secretOrKey: 'your_jwt_secret' // Secret key to verify the JWT
}, (jwtPayload, callback) => {
  // Find the user by ID from the JWT payload
  return Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error);
    });
}));
