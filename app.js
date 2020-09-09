const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Tweet=require('./models/tweet');
const tweetRoutes=require('./router/tweet');



mongoose.connect('mongodb+srv://anonymous_media:anonymous_media@cluster0.9bc8x.mongodb.net/tweet',{ useNewUrlParser: true ,useUnifiedTopology: true})
  .then(()=>{
    console.log('Connected to mongodb');
  })
  .catch(err=>console.log('Could not connect',err.message));
app.use(express.json());
app.use("/tweet", tweetRoutes);

module.exports=app