const express = require("express")
const bodyParser = require("body-parser")
const { Pool } = require('pg')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

//Parsing middleware
app.use(bodyParser.urlencoded({extended: false}))

//Parse application/json
app.use(bodyParser.json())

//connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

//connect to DB
pool.connect((err, client, done) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    throw err;
  }
  console.log('Conectado ao banco de dados');

  // Ao terminar uma consulta, libera a conexão de volta para o pool
  done();
});

app.get('', (req, res) => {
  res.send("Teste")
})

app.listen(port, ()=>{
  console.log(`Aplicação está rodando na porta ${port}`)
})