const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user.js')
const app = express()
 const routeruse = require('./routers/user.js')
const port = process.env.PORT || 3000

//app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(routeruse)



mongoose.connect('mongodb://127.0.0.1:27017/memehlo', {
 useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true 
}).then((v) => {
    app.listen(port , () => {
        console.log('The port is listening to ' + port)
    })
}).catch(e => {
    console.log('Unable to connect db')
})


