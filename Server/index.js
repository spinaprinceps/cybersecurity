const express= require("express")
const mongoose= require("mongoose")
const cors = require("cors")
const clientModel=require('./models/Client')
const app= express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/client");

app.post('/signup',(req,res)=>{
 clientModel.create(req.body)
 .then(Users=> res.json(Users))
 .catch(err=> res.json(err))
});



app.listen(3002,()=>{
    console.log("server is running");
})