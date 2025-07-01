const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const emptErr = "must no be empty."

const validateMsg = [
    body("message").trim()
        .notEmpty().withMessage(`Message ${emptErr}`),
];

module.exports = {
    get: (req, res) => {
        if (!req.user) res.redirect("/");
        else {
            res.render("new-message");
        }
    },
    post: [
        validateMsg,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("new-message", {errors: errors.array()});
            } else {
                await db.newMessage(req.user, req.body.message);
                res.redirect("/");
            }
        }
    ],
    delete: async (req, res) => {
        console.log(typeof req.params.msgId)
        console.log(typeof Number(req.params.msgId))
        console.log(req.params.msgId)
        if (req.user?.admin) await db.deleteMsg(req.params.msgId);
        res.redirect("/");
    }
}