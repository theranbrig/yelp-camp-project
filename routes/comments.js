const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleWare = require("../middleware");

//NEW Comment
router.get("/new", middleWare.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log("Error");
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

//CREATE Comment
router.post("/", middleWare.isLoggedIn, function(req, res) {
    // look up campground by ID
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create a new comment
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;

                    // save comment
                    comment.save();

                    // connect new comment to campground
                    campground.comments.push(comment._id);
                    campground.save();

                    // redirect to the SHOW router
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//EDIT Comment
router.get("/:comment_id/edit", middleWare.checkCommentOwnership, function(
    req,
    res
) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {
                campground_id: req.params.id,
                comment: foundComment
            });
        }
    });
});

//UPDATE Comment
router.put("/:comment_id", middleWare.checkCommentOwnership, function(
    req,
    res
) {
    Comment.findByIdAndUpdate(
        req.params.comment_id,
        req.body.comment,
        (err, updatedComment) => {
            if (err) {
                res.redirect("back");
            } else {
                req.flash("success", "Comment successfully updated.");
                res.redirect("/campgrounds/" + req.params.id);
            }
        }
    );
});

//DELETE Comment
router.delete("/:comment_id", middleWare.checkCommentOwnership, function(
    req,
    res
) {
    Comment.findByIdAndRemove(req.params.comment_id, err => {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment successfully deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;
