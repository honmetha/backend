module.exports = (app, db) => {
  app.get('/getAllUser', (req, res) => {
    db.user.findAll()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send({ message: err.message })
    })
  })

  app.post('/createUser', (req, res) => {
    db.user.create({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      profilepic: req.body.profilepic
    })
    .then(result => {
      res.status(201).send(result)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send({ message: err.message })
    })
  })

  app.delete('/deleteUser', (req, res) => {
    db.user.destroy()
    .then( result => {
      res.send(result)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send({ message: err.message })
    })
  })
}