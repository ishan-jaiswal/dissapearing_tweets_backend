const mongoose=require('mongoose');
const Tweet=require('../models/tweet');

exports.paginatedResults=(model)=>{
    return async (req, res, next) => {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)
  
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      const results = {}
  
      if (endIndex < await model.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }
      try {
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        const v=[];
        const did=[];
        results.results.map((item,i)=>{
          if(new Date(item.duration)>new Date())
          {                    
            v.push(item)
          }
          else{
            did.push(item._id);
          }          
        });
        did.map((item,i)=>{
          Tweet.deleteOne({_id:item})
            .exec()
            .then(result=>{
              console.log('deleted');
            })
            .catch(err=>{
              console.log('deleteion  error');
            })
        })
        res.paginatedResults = v;
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
};

exports.fetchall=(req,res)=>{    
    Tweet.find({},function(err,result){
        if(err)
        {
            res.send(err)            
        }
        else
        {   
            const v=[];
            result.map((item,i)=>{
                if(new Date(item.duration)>new Date(item.createdOn))
                {                    
                    v.push(item)
                }
            })   
            res.send(v);
        }
    })
}
exports.add=(req,res)=>{    
    const tweet=new Tweet({
        _id:new mongoose.Types.ObjectId(),
        taskName : req.body.taskName,
        taskDescription : req.body.taskDescription,
        creator : req.body.creator,
        duration : new Date(req.body.duration),
        createdOn: new Date(),
    });
    tweet
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
            message: "Tweet added"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
            error: err
            });
        });
};