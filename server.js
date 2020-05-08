const express=require('express');
const ejsLint = require('ejs-lint');
const app=express();
const path = require('path');
const router=express.Router();

const mongoose=require('mongoose');
require('dotenv').config()
//app.use(app.router)
app.set('view engine', 'ejs')
app.use(express.json());
const User=require("./model/user")
//app.use('/create_user',User);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:search', function(req, res) {
 req.param.search='^'+req.param.search;
 let v=new RegExp(req.params.search,'i');
  User.find({'Movie Name':{
    $regex:v
 }
})
  .then(v=>res.send(v))
  .catch(err=>console.log(err));


});


app.get('/',function(req,res){
   res.send([]);
});


router.post('/',(req,res)=>{
         const myuser=new User({
         name:req.body.name,
         age:req.body.age
        });
   
      myuser.save()
      .then(r=>console.log(r))
      .catch(e=>console.log(e));
});
run();
async function run(){
await mongoose.connect(process.env.url,
{useUnifiedTopology:true,useNewUrlParser:true},
)

//console.log(docs);
}

app.listen(4000,()=>{
    console.log('300');
});