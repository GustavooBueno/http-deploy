/*
  _input.getAll = {}
  _input.getOne = {}
  _input.post = {
    first_name? : "Gustavo", 
    last_name? : "Bueno", 
    email? : "emai@gmail.com", 
    phone? : 198321837, 
    comments? : "Isso é um exemplo"
  }
  _input.updateOne = {
    first_name? : "Gustavo", 
    last_name? : "Bueno", 
    email? : "emai@gmail.com", 
    phone? : 198321837, 
    comments? : "Isso é um exemplo",
    status? : false
  }
*/


require('dotenv').config()
const { createClient } = require('@supabase/supabase-js');

//connection pool
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getAll = async (req, res) => {
  try {
    // Exemplo de consulta no Supabase
    const { data, error } = await supabase
      .from('user')
      .select('*');

    if (error) {
      return res.status(500).json({success: false, error: error})
    }
    res.status(200).json({success: true, data: data})
  } catch (error) {
    res.status(500).json({success: false, error: error})
  }
};

const post = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, comments } = req.body

    const { data, error } = await supabase
      .from('user')
      .insert({ first_name, last_name, email, phone, comments, status : true})
      .select()

    if(error){
      return res.status(200).json({ success: false, error: error});
    }
    return res.status(200).json({ success: true, data: data});
  } catch (error) {
    return res.status(500).json({ success: false, error: error});
  }
};

const getOne = async (req, res) => {
  try {
    const id = req.params.id

    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', id);

    if(error){
      return res.status(200).json({ success: false, error: error});
    }
    return res.status(200).json({ success: true, data: data});
  } catch (error) {
    return res.status(200).json({ success: false, error: error});
  }
}

const updateOne = async (req, res) => {
  try {
    const id = req.params.id
    const {first_name, last_name, email, phone, comments, status} = req.body

    const { data, error } = await supabase
      .from('user')
      .update({
        first_name, last_name, email, phone, comments, status
      })
      .eq('id', id)
      .select();

    if(error){
      return res.status(200).json({ success: false, error: error});
    }
    return res.status(200).json({ success: true, data: data});
  } catch (error) {
    return res.status(200).json({ success: false, error: error});
  }
}

const deleteOne = async(req, res) => {
  try {
    const id = req.params.id

    const { error } = await supabase
      .from('user')
      .delete()
      .eq('id', id);

    if(error){
      return res.status(200).json({ success: false, error: error});
    }
    return res.status(200).json({ success: true});
  } catch (error) {
    return res.status(200).json({ success: false, error: error});
  }
}

module.exports = {
  getAll,
  post,
  getOne,
  updateOne,
  deleteOne
}