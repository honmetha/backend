const bcrypt = require('bcryptjs')
const passport = require('passport')
const db = require('../../models')
const localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const BCRYPT_SALT_ROUNDS = 12;
let jwtOptions = {};
jwtOptions.secretOrKey = 'om6u5Juq2E570hCL-OGwSaA7J_UpfEiV7VEO8oWuYB_Sf-SyUe03mJssru3Vg7CmUu-Ygt1JlpzixJ-UgLxJv_xyS-y8Re5QLAyvDxvkCL02Uxwfu2guFTL8hnvKtSnOUQIdf_CELQJkfWGYbcC7QAFA14CnZ5_9uSvtML1dw2_O6oZSzUVzDE_SWWPKh0DtAyMz9bQkmdTELCPnqd4vIHF0KPD2tQNwH1sDHfryRcOrYfVptBG5moxUnf9b3koxo6U0sYgpXxRPEy9LHqwVVgBieTTayERtk96gubRWvF0Mq5nlq2MJ7cv5sXpEPgTId9cpIpRoyT7L4AEGWDe18Q'

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

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      db.user.findOne({ where: { username } })
        .then(user => {
          if (!user) {
            console.log('bad username')
            return done(null, false, { message: 'username or password is invalid' });
          }
          bcrypt.compare(password, user.password, function (err, responnse) {
            if (err) {
              console.log(err)
              done(err)
            }
            if (!responnse) {
              console.log('password does not match')
              return done(null, false, { message: 'username or password is invalid' })
            }
            console.log('user found & authenticated');
            return done(null, user);
          })
        })
    }))

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtOptions.secretOrKey,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    db.user.findOne({ where: { id: jwt_payload.id } })
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false)
        }
      })
  })
)

module.exports = { jwtOptions }