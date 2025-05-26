const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const matchErr = "must match.";

const validateUser = [
    body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
    body("username").trim()
        .isLength({ min: 1, max: 10 }).withMessage(`Username ${lengthErr}`),
    body("password")
        .isLength({ min: 1, max: 10 }).withMessage(`Password ${lengthErr}`),
    body("confirmPassword")
        .custom((value, { req }) => {
            return value === req.body.password;
        }).withMessage(`Passwords ${matchErr}`)
];

module.exports = {
    get: (req, res) => {
        if (req.user) res.redirect("/");
        else res.render("signUp");
    },
    post: [ 
        validateUser,
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("signUp", {errors: errors.array()});
            } else {
                try {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    await db.signUp(req.body.firstName, req.body.lastName, req.body.username, hashedPassword);
                    res.redirect("/");
                } catch (error) {
                    console.error(error);
                    next(error);
                }
            }
        }
    ]
};