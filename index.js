const express = require('express')
const db = require('./models')
const bodyParser = require('body-parser')
const userService = require('./services/user')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));

db.sequelize.sync({ alter:true }).then(()=>{
  userService(app, db)

  app.listen(8080,()=>{
    console.log('Server is running')
  })
})