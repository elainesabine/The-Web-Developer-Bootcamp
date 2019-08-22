var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    User = require("./models/user"),

app.use(require("express-session")({
    secret: "hello",
    resave: false,
    saveUninitialized: false
}));
mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/////////////////////////// ROUTES ///////////////////////////

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// AUTH ROUTES

// REGISTER - show sign up form
app.get("/register", function(req, res){
    res.render("register");
});

// handle user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        })
    })
})

// LOGIN ROUTES
// render login form
app.get("/login", function(req, res){
    res.render("login");
});

//login logic
//middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){

})

//LOGOUT
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


////////
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(3000, function(err){
    if(err){
        console.log("err")
    }
    console.log("Serving on port 3000");
});