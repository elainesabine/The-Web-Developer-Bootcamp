var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require("mongoose"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override")

// REQUIRING ROUTES
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index")
    
// APP CONFIGURATION
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
// seedDB(); // get data from seed database file


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "what is this",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to pass in currentUser as a variable into every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

///////////////////////////// ROUTES OVERVIEW /////////////////////////////
// INDEX              /campgrounds                    GET
// NEW CAMPGROUND     /campgrounds/new                GET
// CREATE CAMPGROUND  /campgrounds                    POST
// SHOW CAMPGROUND    /campgrounds/:id                GET
// NEW COMMENT        /campgrounds/:id/comments/new   GET
// CREATE COMMENT     /campgrounds/:id/comments       POST


// Campground.create(
//     {
//         name: "One", 
//         image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg",
//         description: "This is a huge granite hill."
//     }, function(err, campground){
//         if(err){
//             console.log(err)
//         } else {
//             console.log(campground)
//         }
//     }) 


app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000, function(){
    console.log("Serving on port 3000");
});