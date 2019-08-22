var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")

// INDEX - show all campgrounds
router.get("/campgrounds", function(req, res){
    // get all campgrounds from DB
    Campground.find({}, function (err, campgrounds){
        if(err){
            console.log(err)
        } else {
            // if there is no error, load campgrounds page
            res.render("campgrounds/index", {campgrounds: campgrounds})
        }
    });
});


// NEW - show form to create new campground
router.get("/campgrounds/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new")
})


// CREATE - add new campground to the database
router.post("/campgrounds", isLoggedIn, function(req, res){
    // get data from form 
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    //add user to the campground
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: description, author:author}
    
    //create a new campground and save to database
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            console.log(err)
        } else {
            //redirect back to campgrounds page if there is no error creating the newCampground
            console.log(newCampground)
            res.redirect("/campgrounds");
        }
    });
});


// SHOW - shows info about one campground
router.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds")
        } else {
            res.render("campgrounds/edit", {campground: foundCampground})
        }
    })
})

//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", checkCampgroundOwnership, function(req, res){
    //find & update campground
    Campground.findOneAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        } else {
            //redirect
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

// REMOVE CAMPGROUND
router.delete("/campgrounds/:id", checkCampgroundOwnership, function(req, res){
    Campground.findOneAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds")
        }
    })
})
    

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
} 

function checkCampgroundOwnership(req, res, next){
    // is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("/campgrounds")
            } else {
                //does user own it?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back")
                }
            } 
        })
    } else {
        res.redirect("back")
    }
}

module.exports = router;