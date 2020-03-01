const mongoose=require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
  title:{type:String,required:true,},
  description:{type:String,required:true},
  date:{type:Date, default:Date.now}
});
/*const template = handlebars.compile("{{aString.trim}}");
const result = template(
  { aString: "  abc  " },
  {
    allowedProtoMethods: {
      trim: true
    }
  }
); -->*/

module.exports=mongoose.model('Note',NoteSchema)