var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding new cat to the DB
// var george = new Cat({
//     name: "George",
//     age: 11,
//     temperament: "Grouchy"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("something went wrong")
//     } else {
//         console.log("we just saved a cat to the DB");
//         console.log(cat);
//     }
// });

//retreive all cats from the DB
Cat.find({}, function(err, cats){
    if(err){
        console.log(err)
    } else{
        console.log(cats)
    }
})