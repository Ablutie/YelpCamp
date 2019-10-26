var Comment = require("../models/comment"),
    Campground = require("../models/campground");

var middlewareObj = {};

middlewareObj.checkCommentOwner = function(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, comment) {
			if (err) {
				console.log(err);
				res.redirect("back");
			} else {
				if (comment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You need to login as the comment creator")
					res.redirect("back");
				}				
			}
		});
	} else {
		res.redirect("back");
	}
}

middlewareObj.checkCampgroundOwner = function(req, res, next) {
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function (err, campground) {
			if (err) {
				console.log(err);
				res.redirect("back");
			} else {
				if (campground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You need to login as the campground creator");
					res.redirect("back");
				}				
			}
		});
	} else {
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in");
	res.redirect("/login");
}

module.exports = middlewareObj;