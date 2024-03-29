var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")
var Comment = require("../models/comment")

// NEW COMMENT - show form to create a new comment
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground})
        }
    })
    
})

// CREATE COMMENT - add comment to the campground
router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err)
        } else {
            // get data from form and look up campground using id
            Campground.findById(req.params.id, function(err, campground){
                if (err){
                    console.log(err);
                    res.redirect("/campgrounds")
                } else {
                    // create a comment
                    Comment.create(req.body.comment, function(err, comment){
                        if (err) {
                            console.log(err)
                        } else {
                            //add username and id to comment
                            comment.author.id = req.user._id;
                            comment.author.username = req.user.username;
                            // save comment
                            comment.save()
                            //link comment to campground
                            campground.comments.push(comment)
                            campground.save();
                            //redirect back to show page of campground
                            res.redirect("/campgrounds/" + campground._id);
                        }
                    })
                }
            })
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

module.exports = router;