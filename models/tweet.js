const mongoose=require('mongoose');

const tweetSchema=new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskName : String,
    taskDescription : String,
    creator : String,
    duration : Date,
    createdOn: Date
})
module.exports=mongoose.model('Tweet',tweetSchema);