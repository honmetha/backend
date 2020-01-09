const express = require('express')
const db = require('./models')
const bodyParser = require('body-parser')
const userService = require('./services/user')
const postService = require('./services/post')
const cors = require('cors')
const expressFileUpload = require('express-fileupload')

const app = express()

app.use(expressFileUpload());
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
app.use(cors())

db.sequelize.sync({ alter:true }).then(()=>{
  userService(app, db)
  postService(app, db)

  app.listen(8080,()=>{
    console.log('Server is running')
  })
})