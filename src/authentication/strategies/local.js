/**
 * Authentication local strategy module.
 *
 * @author    Rakesh
 * @copyright Copyright (c) 2015, virtual galaxy
 * @license	  The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

/**
 * Module dependencies.
 */
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function localStrategy(User, config) {
    passport.use(new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password'
        },
        function(username, password, callback) {
            User.findOne({
                name: username.toLowerCase()
            }, function(err, user) {
                if (err) return callback(err);

                // no user found with that email
                if (!user) {
                    return callback(null, false, { message: 'The User Name is not registered.' });
                }
                // make sure the password is correct
                user.comparePassword(password, function(err, isMatch) {
                    if (err) { return callback(err); }

                    // password did not match
                    if (!isMatch) {
                        return callback(null, false, { message: 'The password is not correct.' });
                    }

                    // success
                    return callback(null, user);
                });
            });
        }
    ));
}

module.exports = localStrategy;
