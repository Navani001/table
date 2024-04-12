const express=require('express')
const path=require('path')
const app=express()
var mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Navan@123",
  database:"ps"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(express.static(path.join(__dirname,"public")))
app.get('/',(req,res)=>{
    
    res.sendFile(path.join(__dirname,"index.html"))
})
app.post('/user',(req,res)=>{
    var name=req.body.username;
    var pass=req.body.userpass;
   

    con.query("select password from student where name='"+name+"'", function (err, result) {
        if (err) throw err;
        console.log(result);
        if(result.password==pass)
        {console.log("login sucessfully")
            app.get("/",(req,res)=>{
                res.redirect("login successfully");
            })
        }
      });
    
})
app.listen(2500)