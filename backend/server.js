const express = require('express');
const session = require('express-session');
const app = new express();
const passport = require('passport');
const bodyParser = require('body-parser');


const initializePassport = require("./passportConfig");

initializePassport(passport);

const routes = require("./routes");

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));

app.use(session({
	secret: "secret", 
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', routes({
	checkAuthenticated,
	checkNotAuthenticated,
	passport,
	bcrypt,
}));


function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/users/dashboard");
	}
	next();
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()){
		return next()
	}

	res.redirect("/users/login");
}

app.listen(PORT, ()=> {
	console.log(`Server running on port ${PORT}`);
})