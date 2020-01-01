const express = require('express')
const db = require('./models')

const app = express()

db.sequelize.sync({alter:true}).then(()=>{

  app.get('/getAllUser',(req,res)=>{
    db.user.findAll()
    .then(result=>{
      res.send(result)
    })
  })

  app.listen(8080,()=>{
    console.log('Server is running')
  })
})