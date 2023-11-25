const express = require("express")
const bodyParser = require("body-parser")

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

//Parsing middleware
app.use(bodyParser.urlencoded({extended: false}))

//Parse application/json
app.use(bodyParser.json())


const routes = require("./server/routes/user")
app.use('/', routes)


app.listen(port, ()=>{
  console.log(`Aplicação está rodando na porta ${port}`)
})