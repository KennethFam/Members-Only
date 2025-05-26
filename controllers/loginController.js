const { body, validationResult } = require("express-validator");
require("../config/passport");
const passport = require("passport");

const emptErr = "must no be empty."

const validateUser = [
    body("username").trim()
        .notEmpty().withMessage(`Username ${emptErr}`),
    body("password")
        .notEmpty().withMessage(`Password ${emptErr}`)
]

module.exports = {
    get: (req, res) => {
        if (req.user) res.redirect("/");
        else res.render("login");
    },
    post: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    })
}