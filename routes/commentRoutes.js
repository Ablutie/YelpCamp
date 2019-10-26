var express = require("express"),
    Campground = require("../models/campground"),
	Comment = require("../models/comment"),
	middleware = require("../middleware");

var router = express.Router();

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

router.post("/campgrounds/:id/comments", function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, newComment) {
				if (err) {
					console.log(err);
				} else {
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					campground.comments.push(newComment);
					campground.save();
					req.flash("success", "Added new comment")
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwner, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground: req.params.id, comment: foundComment});
		}
	});
});

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwner, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment) {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Successfully edited comment");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwner, function(req, res) {
	Comment.findByIdAndDelete(req.params.comment_id, function(err) {
		if (err) {
			console.log(err);
		}
		req.flash("success", "Deleted comment");
		res.redirect("/campgrounds/" + req.params.id);
	});
});

module.exports = router;