const express = require('express');
const models = require('../database/models/index')

const router = express.Router();

module.exports = (params) => {
	const {checkNotAuthenticated, checkAuthenticated, passport, bcrypt} = params;

	router.get("/register", checkAuthenticated, (req, res)=> {
		res.render("register");
	});
	
	router.get("/login", checkAuthenticated, (req, res)=> {
		res.render("login");
	});
	
	router.get("/dashboard", checkNotAuthenticated, (req, res)=> {
		res.render("dashboard", {user: req.user.name });
	});
	
	router.get("/logout", (req, res)=>{
		req.logOut();
		req.flash("success_msg", "You have been logged out");
		res.redirect("/users/login");
	});
	
	router.post("/register", (req, res)=> {
		let { name, email, password, password2 } = req.body;
		console.log(name, email, password, password2);
	
		let errors = [];
	
		if (!name || !email || !password || !password2) {
			errors.push({message: "Please enter all fields" });
		}
	
		if (password.length < 6) {
			errors.push({message: "Password should be at least 6 characters" });
		}
	
		if (password != password2) {
			errors.push({message: "Passwords do not match" });
		}
	
		if(errors.length > 0) {
			res.render("register", { errors });
		} else {
			// form validation has passed

			models.User.findAll().catch(error =>{
				if(error) {
					throw error;
				}
			}).then((users) => {
				if(users !== undefined && users.length != 0) {
					errors.push({message: "Email already registered"});
					res.render("register", { errors })
				} else {
					(async() => {
						let hashedPassword = await bcrypt.hash(password, 10);
						models.User.create({ name: name, email: email, password: hashedPassword }).then((user) => {
							console.log(user);
						}).catch(error => {
							if(error) {
								throw error;
							}
						});
					})();
					
					//TODO check for error thrown
					req.flash("success_msg", "You are now registered. Please log in");
					res.redirect("/users/login");
				}
			});
		}
	});
	
	router.post(
		"/login", 
		passport.authenticate("local", {
			successRedirect: "/users/dashboard", 
			failureRedirect: "/users/login", 
			failureFlash: true
		})
	);

	return router;
}
