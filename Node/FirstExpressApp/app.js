var express = require("express");
var app = express(); 


// "/" => "Hi there!"
app.get("/", function(req, res){ //req is request, res is response
    res.send("Hi there!");
})

app.get("/bye", function(req, res){
    res.send("Goodbye!");
})

app.get("/dog", function(req, res){
    res.send("MEOW");
})

app.get("*", function(req, res){
    res.send("YOU ARE A STAR")
})

app.listen(3000, function(){
    console.log("Serving on port 3000");
})