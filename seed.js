var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://live.staticflickr.com/3265/2448800728_522426203b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
        author: {id: "5daee7aea7926017d88d9408", username: "Mihai"}
    },
    {
        name: "Granite Hill",
        image: "https://farm8.staticflickr.com/7305/27137494582_c52e2d088f_b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        author: {id: "5daee7aea7926017d88d9408", username: "Mihai"}
    },
    {
        name: "Waterfall Resort",
        image: "https://live.staticflickr.com/2512/3716824940_f43d02c267_b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        author: {id: "5daee7aea7926017d88d9408", username: "Mihai"}
    }
]

function seedDB() {
    // Comment.deleteMany({}, function(err) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("removed comments");
    //     }
    // });
    Campground.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("created new campground");
                        // Comment.create({
                        //     text: "This place is great, but no bathrooms",
                        //     author: "Homer"
                        // }, function(err, comment) {
                        //     if (err) {
                        //         console.log(err);
                        //     } else {
                        //         campground.comments.push(comment);
                        //         campground.save();
                        //         console.log("created new comment");
                        //     }
                        // });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;