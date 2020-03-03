const express = require('express');
const path = require('path');
const exphbs=require('express-handlebars');
const methodOverride=require('method-override');//METODOS para crear dentro de otros metodos
const session=require('express-session');
//const flash=require ('connect-flash')
const handlebars=require('handlebars')
const bodyParser= require('body-parser')




//initializacions
const app=express();
require ('./database');

//seting
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs',exphbs({
  defaultLayout:'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join(app.get('views'),'partials'),
  //allowProtoMethodsByDefault:true,
  //allowProtoPropertiesByDefault:true,
  extname: '.hbs'
}))
app.set('view engine','.hbs');
//midleware
//app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(methodOverride('_method'));
app.use(session({
  secret:'mysecretapp',
  resave:true,
  saveUninitialized:true
}));
//app.use(flash());

//global variables

/*app.use((req,res,next) =>{
res.locals.success_msg=req.flash('success_msg');
res.locals.error_msg=req.flash('error_msg');
})*/

//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//static files
app.use(express.static(path.join(__dirname,'public')))
//server is listening
app.listen(app.get('port'),()=>{
  console.log("server on port",app.get('port'));
});