const jwt = require('jsonwebtoken');
const config = require('../config/passport/passport')
const passport = require('passport')

module.exports = (app, db) => {
  app.post('/registerUser', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.error(err);
      }
      if (info) {
        console.log(info.message);
        res.status(403).send(info.message);
      } else {
        user.update({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          profilepic: req.body.profilepic
        })
          .then(result => {
            res.status(201).send({ message: 'user is created' })
          })
          .catch(err => {
            res.status(400).sned({ message: 'something went wrong' })
          })
      }
    })(req, res, next)
  })

  app.post('/loginUser', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log(err)
      }
      if (info) {
        console.log(info.message);
        res.status(401).send(info.message);
      } else {
        const token = jwt.sign({
          id: user.id,
          role: user.role,
          name: user.name,
          profilepic: user.profilepic,
          firstname: user.firstname,
          lastname: user.lastname
        }, config.jwtOptions.secretOrKey, {
          expiresIn: 3600,
        });
        res.status(200).send({
          auth: true,
          token,
          message: 'user found & loggin in',
        });
      }
    })(req, res, next)
  })

  app.delete('/deleteUser', (req, res) => {
    db.user.destroy()
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        console.error(err)
        res.status(400).send({ message: err.message })
      })
  })
}