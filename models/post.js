var mongoose = require('mongoose');

// schema
var postSchema = mongoose.Schema({ // 1
  title:{type:String, required:[true, 'Title is required!']},
  body:{type:String, required:[true, 'Title is required!']},
  // category: {type: postSchema.Types.ObjectId, ref: 'category'},
  createdAt:{type:Date, default:Date.now}, // 2
  updatedAt:{type:Date},
});

// model & export
var Post = mongoose.model('post', postSchema);
module.exports = Post;