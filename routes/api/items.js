const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => res.json({ msg: "This is the users route" }));
router.get("/items", (req, res) => res.json({ msg: "This is the users route" }));

module.exports = router;
