const express=require('express');
const router=express.Router();
const User=require('../models/User')


router.get('/users/signin',(req,res) => {
  res.render('users/signin');
})
router.get('/users/signup',(req,res) => {
  res.render('users/signup');
})
router.post('/users/signup', async (req,res)=> {
  //console.log(req.body);
  const {name ,email,password,confirm_password}=req.body;
  const errors=[];
  if(name.length <= 0){
    errors.push({text:'plis escribe su nombre'})
  }
  if(password != confirm_password){
    errors.push({text:'password no son iguales'})
  }
  if(password.length < 4){
    errors.push({text:'password debe ser mayor a 4 caracteres'})
  }
  if(errors.length > 0){
    res.render('users/signup',{errors,name,email,password,confirm_password});
  }
  else {
    const emailUser= await User.findOne({email:email});
    if(emailUser){
      //req.flash('error_msg','ya existe email')
      errors.push({text:'el email esta en uso, coloque otro'})
      console.log('ya existe correo')
      req.redirect('users/signup');
    }
    const newUser = new User({name,email,password})
    newUser.password=await newUser.encryptPassword(password);
    await newUser.save();
    //req.flash('error_msg','you are registered')
    console.log('te registrastes exitosamente');
    res.redirect('signin');
  }
});

module.exports=router;