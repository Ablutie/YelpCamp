var express = require("express");
	app = express();
	bodyParser  = require("body-parser");
	mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	session = require("express-session"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	methodOverride = require("method-override"),
	flash = require("connect-flash"),
	seedDB = require("./seed");

var campgroundRoutes = require("./routes/campgroundRoutes"),
	commentRoutes = require("./routes/commentRoutes"),
	indexRoutes = require("./routes/indexRoutes");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useUnifiedTopology: true, useNewUrlParser: true});
seedDB();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(session({
	secret: "YelpCamp is the best site evah",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
});

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

app.listen(3000, function() {
	console.log("Yelp Camp Server has Started");
});