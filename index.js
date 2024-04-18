const express=require('express')
const path=require('path')
const app=express()
var mysql = require('mysql');
const moment = require("moment");
const bodyParser = require('body-parser');
const { render } = require('ejs');

app.set("view engine","ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
var con = mysql.createConnection(
  {
  host: "localhost",
  user: "root",
  password: "Navan@123",
  database:"try"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(express.static(path.join(__dirname,"public")))
app.get('/',(req,res)=>{
  res.render("index",{element:""})
});
var name;
var id;
var user_info={"name":name,"id":id}
var CHECKIN_VALUE={}
var CHECKOUT_VALUE={}
app.get("/user",(req,res)=>{

  con.query("select * from student",function(err,result){
    res.render("user",{contacts:result})
    console.log(result)
  })
})
app.post('/',(req,res)=>{
    name=req.body.username;
    var pass=req.body.userpassword;
    var email=req.body.email;
    con.query("insert into student (name,password,email) values('"+name+"',"+"'"+pass+"',"+"'"+email+"')")
    res.redirect('/user');})
app.listen(2500)