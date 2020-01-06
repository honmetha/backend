const bcrypt = require('bcryptjs')
const passport = require('passport')
const db = require('../../models')
const localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
  'register',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      db.user.findOne({
        where: { username: username }
      }).then(user => {
        if (user !== null) {
          console.log("username already taken");
          return done(null, false, { message: 'username already taken' })
        } else {
          var salt = bcrypt.genSaltSync(12);
          var hashedPassword = bcrypt.hashSync(password, salt);
          db.user.create({ username, password: hashedPassword })
            .then(user => {
              console.log("user created");
              return done(null, user);
            })
            .catch(err => {
              console.error(err)
              done(err)
            })
        }
      })
    }
  )
);