const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let ratingSchema = new mongoose.Schema({
    rating: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


module.exports = mongoose.model("Rating", ratingSchema);
