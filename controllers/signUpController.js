const bcrypt = require("bcryptjs");
const db = require("../db/queries");

module.exports = {
    get: (req, res) => {
        res.render("signUp");
    },
    post: async (req, res, next) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await db.signUp(req.body.firstName, req.body.lastName, req.body.username, hashedPassword);
            res.redirect("/");
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
};