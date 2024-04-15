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
  database:"ps"
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
  var date=moment().format("MMDDYYYY")
  var time=moment().format("HH:mm:ss")

    con.query("SHOW COLUMNS FROM `checkin` LIKE 'i"+ date.toString()+"'", function (err, result) {
     
      if (result[0]==undefined)
      {
        con.query("alter table CHECKIN add column i"+ date.toString()+" time",function (err, result) {
        if (err) throw err;})
        con.query("alter table CHECKIN add column o"+ date.toString()+" time",function (err, result) {
          if (err) throw err;})
      }  
      
    con.query("select * from CHECKIN where id="+id,function (err, result) {
    
        for (var key in result[0]){
          
          if(key[0]=="i")
          {
          CHECKIN_VALUE[key] = result[0][key];
          }
          if(key[0]=="o")
          {
            CHECKOUT_VALUE[key] = result[0][key];
          }
    }
    console.log("page updated")
        res.render("user",{element:CHECKIN_VALUE,user:user_info,element2:CHECKOUT_VALUE});
    })
})
})
app.post('/user',
	(req, res) => {
    
    var date=moment().format("MMDDYYYY")
    var time=moment().format("HH:mm:ss")
     if(req.body.username=="checkout")
     {
      con.query("UPDATE checkin SET o"+date+" = '"+time+"' WHERE id="+id)
      console.log("checked out");
     }
     else{
      con.query("UPDATE checkin SET i"+date+" = '"+time+"' WHERE id="+id)
      console.log("checked in");
     }
     res.redirect('./user');
	});
app.post('/',(req,res)=>{
    name=req.body.username;
    var pass=req.body.userpassword;
    con.query("select * from student where name='"+name+"'", function (err, result) {
        if (err) throw err;
        id=result[0].id
        user_info.id=id
        user_info.name=name
        if(result[0].password==pass)
        {
          console.log("login sucessfully")
          res.redirect('./user');
        }
        else
        {
          res.render("index",{element:"Invalid password or user name"});
        }
      }); 
})
app.listen(2500)