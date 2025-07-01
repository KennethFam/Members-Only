const express = require("express");
const router = express.Router();

const controller = require("../controllers/messageController");

router.get("/", controller.get);
router.post("/", controller.post);
router.delete("/:msgId", controller.delete)

module.exports = router;