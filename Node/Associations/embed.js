var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogdemo", { useNewUrlParser: true });


// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// CREATE USER
// User.create({
//     email: "blueneighbourhood@gmail.com",
//     name: "TRXYE"
// }, function(err){
//     if (err){
//         console.log(err)
//     } else {
//         console.log("user")
//     }
// })

// CREATE POST
// Post.create({
//     title: "hi",
//     content: "youre doing gr8"
// }, function(err){
//     if (err){
//         console.log(err)
//     } else {
//         console.log("saved")
//     }
// })

// RETRIEVING USER AND ADDING A POST
User.findOne({name: "Elaine"}, function(err, user){
    if(err){
        console.log(err)
    } else {
        user.posts.push({
            title: "hi this is a post",
            content: "yo dream"
        });
        user.save(function(err, user){
            if(err){
                console.log(err)
            } else {
                console.log(user)
            }
        })
    }
})