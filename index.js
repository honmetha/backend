const express = require('express')
const db = require('./models')

const app = express()

db.sequelize.sync({alter:true}).then(()=>{

  app.get('/getAllUser',(req,res)=>{
    res.send("hello")
  })

  app.listen(8080,()=>{
    console.log('Server is running')
  })
})