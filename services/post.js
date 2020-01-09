module.exports = (app, db) => {
  app.get('/getAllPost', (req, res) => {
    db.post.findAll({
      attributes:[['message','text'],['img', 'imgUrl']],
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

  app.post('/createPost', (req, res) => {
    if (!req.files) {
      db.post.create({
        message: req.body.message,
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
        img: `http://localhost:8080/${pictureName}.jpeg`
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