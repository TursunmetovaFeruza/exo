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
    var q="select id from users where user_name='"+req.body.userName+"' or user_email='"+req.body.email+"'";
    con.query(q,(err,resl)=>{
      if(err) throw err;
      if(resl !== null ){
        var answer="This account or email is already exist";
        res.send(answer);          

      }else{
      
         var s="insert into users (user_name,user_password,user_email) values ?";
            console.log(req.body);
            var user=[
            [req.body.userName, req.body.passw, req.body.email]
             ];
           con.query(s,[user],(err,result,data)=>{
            if(err) throw err;
              var answer="Welcome "+req.body.userName+" !";
             res.send(answer);
      });}
    })
  
  });
});

router.post('/remind',jsonParser,(req,res)=>{
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
    
router.post('/check',jsonParser,(req,res)=>{
  if(!req.body) return res.sendStatus(400);
  console.log("lalla");
    ms.getConnection((err,con)=>{
     if(err) throw err;
    var q="select user_name from users where user_name='"+req.body.usn+"' and user_password='"+req.body.psw+"'";
    console.log(req.body);
    con.query(q,(err,result,data)=>{
      if(err) throw err;
      if(result.length === 0)
        {
        var answer="The username or password you entered is incorrect. Check the correctness of the entered data.";
        res.send(answer);
        }
      else{
      var answer="Correct";
      res.send(answer);
      }
    });
   }); 
});

router.delete('/delete',jsonParser,(req,res)=>{
   if(!req.body) return res.sendStatus(400);
     console.log(req.body);
  console.log("here we are");
   ms.getConnection((err,con)=>{
     if(err) throw err;
    var q="delete from users where id='"+req.body.id+"'";
    console.log(req.body);
    con.query(q,(err,result,data)=>{
      if(err) throw err;
      if(result.length === 0)
        {
        var answer="We have error:)";
        res.send(answer);
        }
      else{
      var answer="d";
      res.send(answer);
      }
    });
   }); 
})

router.get('/',jsonParser,(req,res)=>{
  res.sendFile(__dirname+'/regout.html');
 
   console.log("he");
});


router.get('/',(req,res)=>{
  res.send('Hello');
});
module.exports=router;
