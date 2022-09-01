var mongoose = require('mongoose');

var postSchema = mongoose.Schema({ 
  selectbox: {type: String, require: true},
  title:{type:String, required:[true, 'Title is required!']},
  body:{type:String, required:[true, 'Title is required!']},
  // category: {type: mongoose.Schema.Types.ObjectId, ref:'category', required:true},
  createdAt:{type:Date, default:Date.now}, 
  updatedAt:{type:Date},
});

var generalPostSchema = mongoose.Schema({ 
  title:{type:String, required:[true, 'Title is required!']},
  body:{type:String, required:[true, 'Title is required!']},
  category: {type: String, require: true},
  createdAt:{type:Date, default:Date.now}, 
  updatedAt:{type:Date},
});

// model & export
var Post = mongoose.model('post', postSchema);
module.exports = Post;