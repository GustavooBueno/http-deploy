const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send("Olá mundo, migrei para express")
})

app.listen(port, () =>{
  console.log(`Servidor está rodando em http://localhost:${port}`)
})