var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require("mongoose");

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// MONGOOSE / MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
    //     title: "test blog",
    //     image: "http://www.san-x.jp/img/characters/sumikko/ttl.png",
    //     body: "Hi this is a blog post"
    // })


// RESFTUL ROUTES

// INDEX ROUTE
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(error);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// CREATE ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

app.post("/blogs", function(req, res){
    // create blog
    Blog.create(req.body.blog, function(err){
        if(err){
            res.render("new");
        } else {
            //redirect to index
            res.redirect("/blogs");
        }
    });
    
});


// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            console.log(err)
        } else {
            res.render("show", {blog: foundBlog})
        }
    })
})

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    //get blog with that ID
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog:foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    // Blog.findByIdAndUpdate(ID, new Data, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            redirect("/blogs")
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    Blogs.FindByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/")
        } else {
            res.redirect("/")
        }
    })
})

app.listen("3000", function(){
    console.log("server is running")
});