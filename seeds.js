let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment");

let data = [
	{
		name: "Beaver Hole",
		image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
		description:
			"Pitchfork godard hoodie tattooed twee wolf polaroid messenger bag. Cray selfies bicycle rights, photo booth locavore farm-to-table woke vice lo-fi pour-over. PBR&B tumeric DIY hammock cold-pressed flannel, bitters intelligentsia readymade lumbersexual hashtag food truck. Occupy venmo fanny pack affogato slow-carb four loko, banjo four dollar toast blue bottle. Ramps asymmetrical affogato tofu. Intelligentsia tacos asymmetrical cred mustache, gluten-free forage vaporware truffaut. Lumbersexual roof party tote bag put a bird on it, taxidermy woke 8-bit try-hard banh mi kombucha austin. Etsy edison bulb bushwick, aesthetic hexagon salvia flannel DIY cronut hoodie. Green juice mustache XOXO church-key, ennui asymmetrical hot chicken taxidermy. Put a bird on it four dollar toast gastropub celiac gluten-free neutra tousled blog, chillwave freegan kitsch gentrify selfies."
	},
	{
		name: "Coyote Ridge",
		image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg",
		description:
			"Pitchfork godard hoodie tattooed twee wolf polaroid messenger bag. Cray selfies bicycle rights, photo booth locavore farm-to-table woke vice lo-fi pour-over. PBR&B tumeric DIY hammock cold-pressed flannel, bitters intelligentsia readymade lumbersexual hashtag food truck. Occupy venmo fanny pack affogato slow-carb four loko, banjo four dollar toast blue bottle. Ramps asymmetrical affogato tofu. Intelligentsia tacos asymmetrical cred mustache, gluten-free forage vaporware truffaut. Lumbersexual roof party tote bag put a bird on it, taxidermy woke 8-bit try-hard banh mi kombucha austin. Etsy edison bulb bushwick, aesthetic hexagon salvia flannel DIY cronut hoodie. Green juice mustache XOXO church-key, ennui asymmetrical hot chicken taxidermy. Put a bird on it four dollar toast gastropub celiac gluten-free neutra tousled blog, chillwave freegan kitsch gentrify selfies."
	},
	{
		name: "Gopher Creek",
		image: "https://farm4.staticflickr.com/3805/9667057875_90f0a0d00a.jpg",
		description:
			"Pitchfork godard hoodie tattooed twee wolf polaroid messenger bag. Cray selfies bicycle rights, photo booth locavore farm-to-table woke vice lo-fi pour-over. PBR&B tumeric DIY hammock cold-pressed flannel, bitters intelligentsia readymade lumbersexual hashtag food truck. Occupy venmo fanny pack affogato slow-carb four loko, banjo four dollar toast blue bottle. Ramps asymmetrical affogato tofu. Intelligentsia tacos asymmetrical cred mustache, gluten-free forage vaporware truffaut. Lumbersexual roof party tote bag put a bird on it, taxidermy woke 8-bit try-hard banh mi kombucha austin. Etsy edison bulb bushwick, aesthetic hexagon salvia flannel DIY cronut hoodie. Green juice mustache XOXO church-key, ennui asymmetrical hot chicken taxidermy. Put a bird on it four dollar toast gastropub celiac gluten-free neutra tousled blog, chillwave freegan kitsch gentrify selfies."
	},
	{
		name: "Bear Ridge",
		image: "https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg",
		description:
			"Pitchfork godard hoodie tattooed twee wolf polaroid messenger bag. Cray selfies bicycle rights, photo booth locavore farm-to-table woke vice lo-fi pour-over. PBR&B tumeric DIY hammock cold-pressed flannel, bitters intelligentsia readymade lumbersexual hashtag food truck. Occupy venmo fanny pack affogato slow-carb four loko, banjo four dollar toast blue bottle. Ramps asymmetrical affogato tofu. Intelligentsia tacos asymmetrical cred mustache, gluten-free forage vaporware truffaut. Lumbersexual roof party tote bag put a bird on it, taxidermy woke 8-bit try-hard banh mi kombucha austin. Etsy edison bulb bushwick, aesthetic hexagon salvia flannel DIY cronut hoodie. Green juice mustache XOXO church-key, ennui asymmetrical hot chicken taxidermy. Put a bird on it four dollar toast gastropub celiac gluten-free neutra tousled blog, chillwave freegan kitsch gentrify selfies."
	}
];

const seedDB = () => {
	// Remove Campgrounds
	Campground.remove({}, err => {
		// if (err) {
		//     console.log("Error");
		// } else {
		//     console.log("Removed Campgrounds");
		// }
		// // Create Campgrounds
		// data.forEach( (seed) => {
		//     Campground.create(seed, (err, campground) => {
		//         if (err) {
		//             console.log("Error");
		//         } else {
		//             console.log("Added Campground");
		//             // Create Comments
		//             Comment.create(
		//               {
		//                 text: "Wolf keffiyeh banjo palo santo letterpress, lyft vape microdosing 90's marfa small batch intelligentsia. Chartreuse irony biodiesel fanny pack tbh. Taxidermy beard franzen farm-to-table chicharrones.",
		//                 author: "Homer"
		//               },
		//               (err, comment) => {
		//                 if (err) {
		//                   console.log("Error");
		//                 } else {
		//                   campground.comments.push(comment);
		//                   campground.save();
		//                   console.log(
		//                     "Created New Comment"
		//                   );
		//                 }
		//               }
		//             );
		//         }
		//     });
		// });
	});
};

module.exports = seedDB;
