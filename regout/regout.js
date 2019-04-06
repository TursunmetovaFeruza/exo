var ms = require('./connect.js').mysql_pool;
var express=require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var fs=require('fs');
router.get('/a',jsonParser,(req,res)=>{
 ms.getConnection((err,con)=>{
    if(err) throw err;
    var q="select * from users";
    con.query(q,(err,users,data)=>{
      if (err) throw err;
      
      res.send(users);
    });
  });
});

router.post('/',jsonParser,(req,res)=>{
  if(!req.body) return res.sendStatus(400);
   ms.getConnection((err,con)=>{
    if(err) throw err;
    var q="select user_name,user_email from users where user_name='"+req.body.userName+"' and user_email='"+req.body.email+"'";
    con.query(q,(err,resl)=>{
      if(err) throw err;
      if(resl.user_name === null && resl.user_email===null){
           var s="insert into users (user_name,user_password,user_email) values ?";
            console.log(req.body);
            var user=[
            [req.body.userName, req.body.passw, req.body.email]
             ];
           con.query(s,[user],(err,result,data)=>{
            if(err) throw err;
             console.log('Good');
             res.send('Birds home page');
    });
      }else{
        console.log('Nope');
      }
    })
  
  });
});

router.post('/re',jsonParser,(req,res)=>{
  var response = null;
  if(!req.body) return res.sendStatus(400);
  console.log(req.body.email);
    ms.getConnection((err,con)=>{
     if(err) throw err;
    var q="select * from users where  user_email='"+req.body.email+"'";
    con.query(q,(err,results,data)=>{
      if(err) throw err;
      if(results.length === 0)
        {console.log('Bad');
        }
      else{
        var s="select user_name, user_password from users where  user_email='"+req.body.email+"'"
        con.query(s,(err,result,data)=>{
          console.log(result);
           res.send(result);
            })
          }
          });
    });
    
   }); 
    
router.post('/ch',jsonParser,(req,res)=>{
  if(!req.body) return res.sendStatus(400);
  console.log("lalla");
    ms.getConnection((err,con)=>{
     if(err) throw err;
    var q="select user_name from users where user_name='"+req.body.usn+"' and user_password='"+req.body.psw+"'";
    console.log(req.body);
    con.query(q,(err,result,data)=>{
      if(err) throw err;
      if(result.length === 0)
        {console.log('Bad');
        res.send('Birdse');}
      else{
      console.log('Good');
       res.send('Hello '+result);}
    });
   }); 
});

router.get('/',jsonParser,(req,res)=>{
  res.sendFile(__dirname+'/regout.html');
 
   console.log("he");
});


router.get('/',(req,res)=>{
  res.send('Hello');
});
module.exports=router;