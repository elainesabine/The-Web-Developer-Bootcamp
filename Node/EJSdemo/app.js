var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs")
});

app.get("/fallinlovewith/:thing", function(req, res){
    thing = req.params.thing
    res.render("love.ejs", {thingVar: thing})
})

app.listen(3000, function(){
    console.log("Listening on port 3000");
});