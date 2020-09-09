//ENVIRONMENT VARIABLES FROM env.yaml
const yenv = require('yenv')
const env = yenv('env.yaml', { env: process.env.NODE_ENV })
const {PORT=process.env.PORT, SECRET} = env

//AUTH
const jwt = require('jsonwebtoken')
const {auth} = require('./auth.js')

//Bringing in Express
const express = require('express')
const app = express()

//OTHER IMPORTS
const session = require('express-session')
const morgan = require('morgan')


////////////
//MIDDLEWARE
////////////
app.use(express.static('public'))
app.use(express.json())
app.use(morgan('tiny')) //logging


///////////////
//Routes and Routers
//////////////
app.get('/', (req, res) => {
    res.json({hello: "Hello World!"})
})


//These routes are to generate a test JWT and test out your auth function from auth.js
app.get("/testauth", auth(SECRET), (req, res) => {
    res.json(req.payload)
})

app.get("/testjwt", (req, res) => {
    const token = jwt.sign({hello: "world"}, SECRET)
    res.json({token})
})



//LISTENER
app.listen(PORT, () => {
    console.log(`Your are listening on port ${PORT}`)
})