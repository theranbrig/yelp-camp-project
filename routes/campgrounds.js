const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const User = require("../models/user");
const Comment = require("../models/comment");
const Rating = require("../models/rating");
const middleWare = require("../middleware");
const geocoder = require("geocoder");

// INDEX - Show all Campgrounds

router.get("/", function(req, res) {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                page: "campgrounds"
            });
        }
    });
});

// CREATE - add new campground to DB
router.post("/", middleWare.isLoggedIn, function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.campground.name;
    var image = req.body.campground.image;
    var desc = req.body.campground.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var price = req.body.campground.price;
    geocoder.geocode(req.body.campground.location, function(err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = {
            name: name,
            image: image,
            description: desc,
            price: price,
            author: author,
            location: location,
            lat: lat,
            lng: lng
        };
        // Create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                //redirect back to campgrounds page
                console.log(newlyCreated);
                res.redirect("/campgrounds");
            }
        });
    });
});

// NEW - Show New Form

router.get("/new", middleWare.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// SHOW - Shows more info about one campground

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id)
        .populate("comments")
        .populate("ratings")
        .populate("users")
        .exec((err, foundCampground) => {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if (foundCampground.ratings.length > 0) {
                    var ratings = [];
                    var length = foundCampground.ratings.length;
                    foundCampground.ratings.forEach(function(rating) {
                        ratings.push(rating.rating);
                    });
                    var rating = ratings.reduce(function(total, element) {
                        return total + element;
                    });
                    foundCampground.rating = rating / length;
                    foundCampground.save();
                }
                res.render("campgrounds/show", { campground: foundCampground });
            }
        });
});

// EDIT - Campground Route

router.get("/:id/edit", middleWare.checkCampgroundOwnership, function(
    req,
    res
) {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

// UPDATE - Campground Route

router.put("/:id", function(req, res) {
    geocoder.geocode(req.body.campground.location, function(err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {
            name: req.body.campground.name,
            image: req.body.campground.image,
            description: req.body.campground.description,
            price: req.body.campground.price,
            location: location,
            lat: lat,
            lng: lng
        };
        Campground.findByIdAndUpdate(req.params.id, { $set: newData }, function(
            err,
            campground
        ) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash("success", "Successfully Updated!");
                res.redirect("/campgrounds/" + campground._id);
            }
        });
    });
});

// DESTROY - Delete Campground

router.delete("/:id", middleWare.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, err => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground Deleted");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
