const passport = require('passport')

module.exports = (app, db) => {
  app.get('/getAllPost', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.post.findAll({
      where: { user_id: req.user.id },
      attributes: [['message', 'text'], ['img', 'imgUrl']],
      order: [
        ['id', 'DESC']
      ]
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        console.error(err)
        res.status(400).send({ message: err.message })
      })
  })

  app.post('/createPost', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (!req.files) {
      db.post.create({
        message: req.body.message,
        user_id: req.user.id
      })
        .then(result => {
          res.status(201).send(result)
        })
        .catch(err => {
          console.error(err)
          res.status(400).send({ message: err.message })
        })
      res.status(201).send('posted without img')
    } else {
      const picture = req.files.postImage

      let pictureName = (new Date()).getTime()
      picture.mv(`./uploads/${pictureName}.jpeg`)
      console.log(req.body.message)
      db.post.create({
        message: req.body.message,
        img: `http://localhost:8080/${pictureName}.jpeg`,
        user_id: req.user.id
      })
        .then(result => {
          res.status(201).send(result)
        })
        .catch(err => {
          console.error(err)
          res.status(400).send({ message: err.message })
        })
    }
  })
}