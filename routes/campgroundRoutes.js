var express = require("express"),
	Campground = require("../models/campground"),
	middleware = require("../middleware");


var router = express.Router();

router.get("/campgrounds", function (req, res) {
	Campground.find({}, function (err, allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", { campgrounds: allCampgrounds });
		}
	});
});

router.get("/campgrounds/new", middleware.isLoggedIn, function (req, res) {
	res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function (req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function (err, found) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", { campgrounds: found });
		}
	});
})

router.post("/campgrounds", middleware.isLoggedIn, function (req, res) {
	var author = { id: req.user._id, username: req.user.username };
	var newCampground = { name: req.body.name, image: req.body.image, description: req.body.description, author: author };
	Campground.create(newCampground, function (err, newCampground) {
		if (err) {
			console.log(err);
		} else {
			req.flash("success", "Added new campground");
			res.redirect("/campgrounds");
		}
	});
});

router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwner, function (req, res) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function (err, campground) {
			res.render("campgrounds/edit", { campground: campground });
		});
	} 
});

router.put("/campgrounds/:id", middleware.checkCampgroundOwner, function (req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCamp) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Successfully edited campground");
			res.redirect("/campgrounds/" + updatedCamp._id);
		}
	});
});

router.delete("/campgrounds/:id", middleware.checkCampgroundOwner, function (req, res) {
	Campground.findByIdAndDelete(req.params.id, function (err) {
		if (err) {
			console.log(err);
		}
		req.flash("success", "Deleted campground");
		res.redirect("/campgrounds");
	});
});

module.exports = router;