const db = require("../db/queries");

module.exports = {
    post: async (req, res) => {
        if (req.user?.admin) await db.deleteMsg(req.body.id);
        res.redirect("/");
    }
}