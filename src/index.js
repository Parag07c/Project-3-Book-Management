const express = require('express')
const {default : mongoose} = require('mongoose')
const route = require('./route/route.js')
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://Parag:RVhLsVk7mqm1pFlQ@project.rn0fkso.mongodb.net/Database",{
    useNewUrlParser :true
})
.then(() => console.log("mongoDb is connected"))
.catch((error) => error.message)

app.use('/',route)

app.listen(process.env.PORT || 3000,function(){
    console.log("server running on port"+ " " + (process.env.port || 3000))
})

