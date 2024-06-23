// Secret key used for signing JWTs
const jwtSecret = 'your_jwt_secret';

// Import jsonwebtoken and passport libraries
const jwt = require('jsonwebtoken'),
    passport = require('passport');

// Require the passport configuration file
require('./passport');

/**
 * Function to generate a JWT token for a given user.
 *
 * @param {Object} user - The user object for which the token is generated.
 * @returns {String} - The generated JWT token.
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // Username of the user
        expiresIn: '7d', // Token expiration time
        algorithm: 'HS256' // Signing algorithm
    });
}

/* POST LOGIN route */
module.exports = (router) => {
    router.post('/login', (req, res) => {
        // Authenticate the user using the local strategy
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                // If there is an error or the user is not found, respond with a 400 status and an error message
                return res.status(400).json({
                    message: "Something is not right",
                    user: user
                });
            }
            // Log in the user without establishing a session
            req.login(user, { session: false }, (error) => {
                if (error) {
                    // If there is an error during login, respond with the error
                    res.send(error);
                }
                // Generate a JWT token for the logged-in user
                let token = generateJWTToken(user.toJSON());
                // Respond with the user object and the generated token
                return res.json({ user, token });
            });
        })(req, res);
    });
}
