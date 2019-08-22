var express = require("express");
var app = express();


app.get("/", function(request, response){
    response.send("Hi there, welcome to my assignment!");
})

app.get("/speak/:animal", function(request, response){
    var animal = request.params.animal.toLowerCase()
    sounds = {
        "pig": "Oink",
        "cow": "Moo",
        "dog": "Woof Woof!"
    }
    sound = "'" + sounds[animal] + "'"
    response.send("The " + animal + " says " + sound)
})  

app.get("/repeat/:word/:number", function(request, response){
    var word = request.params.word
    var number = Number(request.params.number)
    var output = []
    for (var i = 0; i < number; i ++){
        output.push(word)
    }
    response.send(output.join(" "))
})

app.get("*", function(request, response){
    response.send("Sorry, page not found")
})

app.listen(3000, function(){
    console.log("Listening on port 3000")
})