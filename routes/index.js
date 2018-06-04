const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const Campground = require("../models/campground");
const Comment = require("../models/comment");

//Render Landing Page
router.get("/", function(req, res) {
	res.render("landing");
});

//Show Register Page
router.get("/register", function(req, res) {
	res.render("register", { page: "register" });
});

//Sign Up Post Info
router.post("/register", function(req, res) {
	let newUser = new User({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		avatar: req.body.avatar
	});
	if (req.body.adminCode === "secretcode123") {
		newUser.admin = true;
	}

	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			req.flash("error", err.message);
			res.redirect("back");
		}
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome to YelpCamp, " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//LOGIN Forms
router.get("/login", function(req, res) {
	res.render("login", { page: "login" });
});

//LOGIN Post
router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),
	function(req, res) {}
);

// USER PROFILE
router.get("/users/:id", function(req, res) {
	User.findById(req.params.id, function(err, foundUser) {
		if (err) {
			req.flash("error", "Something went wrong.");
			res.redirect("/");
		}
		Campground.find()
			.where("author.id")
			.equals(foundUser._id)
			.exec(function(err, campgrounds) {
				if (err) {
					req.flash("error", "Something went wrong.");
					res.redirect("/");
				} else {
					Comment.find()
						.where("author.id")
						.equals(foundUser._id)
						.exec(function(err, comments) {
							if (err) {
								req.flash("error", "Something went wrong.");
								res.redirect("/");
							}
							res.render("users/show", {
								user: foundUser,
								comments: comments,
								campgrounds: campgrounds
							});
						});
				}
			});
	});
});

//Logout
router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "You Logged Out");
	res.redirect("/campgrounds");
});
module.exports = router;
