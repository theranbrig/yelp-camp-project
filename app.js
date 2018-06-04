const express = require("express");
const request = require("request");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const moment = require("moment");
const geocoder = require("geocoder");
const Campground = require("./models/campground");
const seedDB = require("./seeds");
const Comment = require("./models/comment");
const User = require("./models/user");
const app = express();

const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");
const ratingRoutes = require("./routes/ratings");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
app.set("view engine", "ejs");

// seedDB(); // Seed DB

//Passport Config
app.use(
    require("express-session")({
        secret: "Gophers are the best.",
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);
app.use("/campgrounds/:id/ratings", ratingRoutes);

app.listen(3000, function() {
    console.log("Yelp Camp is listening on port 3000!");
});