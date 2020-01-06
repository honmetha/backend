module.exports = (app, db) => {
  app.get('/getAllPost', (req, res) => {
    db.user.findAll()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send({ message: err.message })
    })
  })

  app.post('/createPost', (req, res) => {
    db.user.create({
      message: req.body.message,
      img: req.body.img
    })
    .then(result => {
      res.status(201).send(result)
    })
    .catch(err => {
      console.error(err)
      res.status(400).send({ message: err.message })
    })
  })
}