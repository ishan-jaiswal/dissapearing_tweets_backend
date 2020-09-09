const express = require("express");
const router = express.Router();
const TweetController=require('../controllers/tweet')
const Tweet =require('../models/tweet');

router.post('/add',TweetController.add);

router.get('/list',TweetController.paginatedResults(Tweet),(req,res)=>{
    res.json(res.paginatedResults);
});

module.exports=router;