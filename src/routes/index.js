//const router= require ('express').Router();
const express=require('express');
const router=express.Router();
// router es para permitir tener un obj para facilitar la creacion de rutas
// crear rutas del servidor
router.get('/',(req,res) => {
  res.render('index');
});
router.get('/about',(req,res) =>{
  res.render('about');
});

module.exports=router;