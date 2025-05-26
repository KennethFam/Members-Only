require("../config/passport");
const passport = require("passport");

module.exports = {
    get: (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");
        });
    }
}