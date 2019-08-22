var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogdemo_2", { useNewUrlParser: true });


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
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

var User = mongoose.model("User", userSchema);

// CREATE USER
// User.create({
//     email: "elaine@gmail.com",
//     name: "Elaine"
// }, function(err){
//     if (err){
//         console.log(err)
//     } else {
//         console.log("user")
//     }
// })

// // CREATE POST
// Post.create({
//     title: "hi part 3",
//     content: "youre doing gr8"
// }, function(err, post){
//     User.findOne({name: "Elaine"}, function(err, foundUser){
//         if(err){
//             console.log(err)
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err)
//                 } else {
//                     console.log(data);
//                 }
//             })
//         }
//     })
// })


// PUTTING THE POST TO THE USER BY GETTING THE IDS
User.findOne({name:"Elaine"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err)
    } else {
        console.log(user)
    }
})