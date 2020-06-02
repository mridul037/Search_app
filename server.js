const express=require('express');
const ejsLint = require('ejs-lint');
const app=express();

const path = require('path');
const router=express.Router();
const elastic=require('elasticsearch');
var client = new elastic.Client({  
  cloud:{
    id:'mri:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyRjNGIxYWFiNGQ5Yzc0NWM3YmE0MmIyZTA5YzFkYWM5NyQzNGM2YWI2ZmYwYjY0YTY0OWUxMWMxODNjYWE2YzIwOA=='
},
auth:{
  username: 'elastic',
  password: 'W0Wy8eKjuqEa9qs4NQcRD0a4'
}
});

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
  let key=req.params.search;
  // client.get({
  //   index:'mri',
  //   'Movie Name':key
  // },function(err,res){
  //   if(err){return console.log(err)}
  //   else{
  //      console.log(res._source);
  //   }
  // })
  //console.log(key);
 req.params.search='^'+req.params.search+'*';
 
 let v=new RegExp(req.params.search,'i');
 
  //let v=new RegExp(req.params.search,'i');
   User.find({'Movie Name':{
     $regex:v
  }
 }).then(v=>v.map(e=>e['Movie Name']))
   .then(v=>v.filter(e=>(editDist(e,key)<10)))
   .then(v=>res.send(v))
   .catch(err=>console.log(err));
 
 
 
  

  
function editDist(str1,str2){
   let m=str1.length;
   let n=str2.length;
   let dp=Array.from(Array(m+1),e=>Array(n+1));
    for(let i=0;i<=m;i++)
    for(let j=0;j<=n;j++){
      if(i==0)dp[i][j]=j;
      else if(j==0)dp[i][j]=i;
      else if(str1[i-1]==str2[j-1])
         dp[i][j]=dp[i-1][j-1];
       else
       dp[i][j]=1+Math.min(dp[i][j-1],Math.min(dp[i-1][j],dp[i-1][j-1]));  
    }
    return dp[m][n];
 }


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

app.listen(process.env.PORT||4000,()=>{
    console.log('4000');
});