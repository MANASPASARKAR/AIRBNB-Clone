const User = require("../models/user.js");
const passport = require("passport");

//signup
module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect(res.locals.redirectUrl || "/listings");
        })

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}


//login
module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to WanderLust");
    res.redirect(res.locals.redirectUrl || "/listings");
}


//logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.flash("success", "You have logged out!");
        res.redirect(res.locals.redirectUrl || "/listings");
    })
}