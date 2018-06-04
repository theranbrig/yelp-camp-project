const Campground = require("../models/campground");
const Comment = require("../models/comment");

let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                res.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                // Does User Own Campground?
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You can not edit that campground.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to login first.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "Please Login First.");
        res.redirect("/login");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.flash("error", "Comment not found.");
                res.redirect("back");
            } else {
                // Does User Own Campground?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You can not edit that comment.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to login first.");
        res.redirect("back");
    }
};

middlewareObj.checkRatingExists = function(req, res, next) {
    Campground.findById(req.params.id)
        .populate("ratings")
        .exec(function(err, campground) {
            if (err) {
                console.log(err);
            }
            for (var i = 0; i < campground.ratings.length; i++) {
                if (campground.ratings[i].author.id.equals(req.user._id)) {
                    req.flash("success", "You already rated this!");
                    return res.redirect("/campgrounds/" + campground._id);
                }
            }
            next();
        });
};

module.exports = middlewareObj;
