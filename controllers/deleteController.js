const db = require("../db/queries");

module.exports = {
    post: async (req, res) => {
        await db.deleteMsg(req.body.id);
        res.redirect("/");
    }
}