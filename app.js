const express = require("express")
const bodyParser = require("body-parser")
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

//Parsing middleware
app.use(bodyParser.urlencoded({extended: false}))

//Parse application/json
app.use(bodyParser.json())

//connection pool
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


app.get('/', async (req, res) => {
  try {
    // Exemplo de consulta no Supabase
    const { data, error } = await supabase
      .from('user')
      .select('*');

    if (error) {
      console.error('Erro ao consultar o Supabase:', error);
      throw error;
    }

    console.log('Dados do Supabase:', data);
    res.send("Teste");
  } catch (error) {
    console.error('Erro interno do servidor:', error);
    res.status(500).send('Erro interno do servidor');
  }
});
app.post('/teste', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('user')
      .insert({})
      .select()

    if(error){
      console.log(error)
      return res.status(201).json({ success: false, objeto: data});
    }
    return res.status(201).json({ success: true, objeto: data});
  } catch (error) {
    console.error('Erro interno do servidor:', error);
    return res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});



app.listen(port, ()=>{
  console.log(`Aplicação está rodando na porta ${port}`)
})