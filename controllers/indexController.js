const db = require("../db/queries");

module.exports = {
    get: async (req, res) => {
        // if there is a user, it will be stored in req.user due to how passport works
        const messages = req.user?.mem_status || req.user?.admin ? await db.getMessagesWithData() : await db.getMessagesWithoutData();
        res.render("index", {user: req.user, messages: messages});
    }
}