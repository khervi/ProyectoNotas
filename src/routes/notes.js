const express=require('express');
const handlebars=require('handlebars');
const Note= require('../models/Note');
const{isAuthenticated}=require('../helpers/auth');
/*const template = handlebars.compile("{{Note}}");
const result = template(
  {Note},
  {
    allowProtoPropertiesByDefault:true
  },
  {
    allowedProtoMethodsByDefault:true
  }
);*/
//console.log("pinta",result)

const router=express.Router();
// router es para permitir tener un obj para facilitar la creacion de rutas
// crear rutas del servidor


router.get('/notes/add',isAuthenticated,(req,res) => {
  res.render('notes/new-note');
})
router.post('/notes/new-note',isAuthenticated,async (req,res)=>{
  //console.log(req.body);
  const {title,description}=req.body;
  const errors=[];
  if(!title){
    errors.push({text:'please write a title'})
  }
  if(!description){
    errors.push({text:'please writea description'})
  }
  if(errors.length>0){
    res.render('notes/new-note',{
        errors,
        title,
        description
    });
    
  } else {
    const newNote = new Note({title,description});
    newNote.user= req.user.id;
    //console.log(newNote);
    await newNote.save();
    //req.flash('success_msg','nota add successfully');
    res.redirect('/notes');
      // res.send('oki');
  }
});
router.get('/notes',isAuthenticated,async(req,res) => {
  //res.send('Notes para database');
const notes = await Note.find({user:req.user.id}).sort({date:'desc'});
//console.log(notes);
res.render('notes/all-notes',{notes});
//res.send('okidoki')
});
router.get('/notes/edit/:id',isAuthenticated,async (req,res)=>{
  const note = await Note.findById(req.params.id);
  res.render('notes/edit-note',{note})

});
router.put('/notes/edit-note/:id',isAuthenticated,async(req,res)=>{
  const {title,description}=req.body;
  await Note.findOneAndUpdate(req.params.id,{title,description});
  //req-flash('succes_msg','note update success')
  res.redirect('/notes')
});
router.delete('/notes/delete-note/:id',isAuthenticated,async (req,res)=>{
  //console.log(req.params.id);
  await Note.findByIdAndDelete(req.params.id);
  //req-flash('succes_msg','note update success')
  res.redirect('/notes')
})


module.exports=router;