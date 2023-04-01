const Express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserController = require("./Routes/User");
const PostController = require('./Routes/Post');
require("dotenv").config()

const app = Express()
app.use(Express.json({limit:"30mb",extended:true}))
app.use(cors())

const Connection_Url = "mongodb+srv://krishna:spkrishna@krishnacluster.xjap0dj.mongodb.net/hoxdb?retryWrites=true&w=majority"
const Port = process.env.PORT || 5000;

mongoose.connect(Connection_Url).then(()=>{
    app.listen(Port,(err)=>{
        if(!err){
            console.log(`The Server running at ${Port} And Db Has Connected`)
        }
    })
}).catch((err)=>{
    console.log(err)
})

// static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})
//controlling other pages
app.use("/user",UserController)
app.use("/post",PostController)
