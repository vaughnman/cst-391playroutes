const express = require('express')
import data from './data/data.json'
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.get("/", function (_req, res){
    res.send('This is the default root Route')
})

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}!`)
})

app.use(bodyParser.json())

//CORS Middleware
app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, " +
        "Content-Type, " +
        "Accept, " +
        "x-client-key," +
        "x-client-token," +
        "x-client-secret," +
        "Authorization")
    next()
})

app.get("/users", function (_req, res){
    res.json(data)
})

app.get("/users/:id", function (_req, res) {
    const userId = Number(_req.params.id)
    if (userId in data) {
        res.status(200).json(data[userId - 1])
    } else {
        res.status(400).send({
            status: "400",
            message: 'ID not found'
        })

    }
app.post("/users", function (_req, res){
    const newId = Object.keys(data).length+1
    const newUser = {
        id: newId,
        first_name: _req.body.first_name,
        last_name: _req.body.last_name,
        email: _req.body.email,
        username: _req.body.username,
        password: _req.body.password
    }
    data.push(newUser)
    res.status(200).json({error: "New User Added", location: "/users/" + (newId)})
})


})