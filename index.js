const express=require('express')
const path=require('path')
const app=express()
var mysql = require('mysql');

const bodyParser = require('body-parser');
app.set("view engine","ejs")

app.use(bodyParser.urlencoded({ extended: false }));
var con = mysql.createConnection(
  {
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
  res.render("index",{element:""});
})


app.post('/user',(req,res)=>{
    var name=req.body.username;
    var pass=req.body.userpassword;
    con.query("select password from student where name='"+name+"'", function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log(result[0].password)
        console.log(pass)
        if(result[0].password==pass)
        {
          console.log("login sucessfully")
          res.render("user",{element:name});
        }
        else
        {
          res.render("index",{element:"Invalid password or user name"});
        }
      });
    
})
app.listen(2500)