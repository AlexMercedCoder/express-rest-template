//ENVIRONMENT VARIABLES FROM env.yaml
const yenv = require('yenv')
const env = yenv('env.yaml', { env: process.env.NODE_ENV })
process.env = {...process.env, ...env}
const {PORT, SECRET, NODE_ENV} = process.env
console.log(PORT)

//CORTS
const cors = require('cors')
const corsOptions = require('./configs/cors.js')

//AUTH
const jwt = require('jsonwebtoken')
const {auth} = require('./configs/auth.js')

//Bringing in Express
const express = require('express')
const app = express()

//OTHER IMPORTS
const session = require('express-session')
const morgan = require('morgan')


////////////
//MIDDLEWARE
////////////
NODE_ENV === 'production' ? app.use(cors(corsOptions)) : app.use(cors())
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