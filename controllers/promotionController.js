if (process.env.NODE_ENV !== "PROD") require("dotenv").config();
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const emptErr = "must no be empty."

const validatePromotion = [
    body("role").trim()
        .notEmpty().withMessage(`Role ${emptErr}`),
    body("password")
        .notEmpty().withMessage(`Password ${emptErr}`),
];

module.exports = {
    get: (req, res) => {
        if (req.user) res.render("promotion");
        else res.redirect("/");
    },
    post: [
        validatePromotion,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("promotion", {errors: errors.array()});
            } else {
                const pass = req.body.role === "member" ? process.env.MEMBER_SECRET : process.env.ADMIN_SECRET;
                if (req.body.password === pass) {
                    await (req.body.role === "member" ? db.promoteToMember(req.user) : await db.promoteToAdmin(req.user));
                    res.redirect("/");
                }
                else res.redirect("promotion");
            }
        }
    ]
}