const Express = require("express")
const app = Express.Router()
const postModel  = require("../Models/Post");

// view posts
app.get("/postform", (req,res)=>{
    postModel.find().sort({time : 1}).then((post)=> {
        res.status(200).send( post );
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

// new post
app.post("/postform",(req,res)=>{
    const postdate = new Date();
    let datepost = postdate + ""
    datepost = datepost.split(" ");
    datepost = datepost.splice(1, 3).join(" ");

    postModel.create({
        image : req.body.image,
        likes: req.body.likes,
        author: req.body.author,
        date: datepost,
        location: req.body.location,
        description : req.body.description
    }).then((db)=>{
        res.status(200).send("Post Created Successfully")
    }).catch((err)=>{
        res.status(400).send(err);
    })
})
// delete post
app.delete("/delete/:_id",(req,res)=>{
    postModel.find({_id: req.params._id}).then(()=>{
        try{
            postModel.deleteOne({_id: req.params._id}).then((post)=>{
                console.log("post deleted  successfully")
                res.status(200).send("Post Deleted")

            }).catch((err)=>{
                console.log(err)
                res.status(400).send("Post Deleted")
            })
        }catch(err){
            res.status(400).send("Post Not found")
        }
    })
})

module.exports = app;
