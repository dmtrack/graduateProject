const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/comment", require("./comment.routes"));
router.use("/segment", require("./segment.routes"));
router.use("/city", require("./city.routes"));
router.use("/user", require("./user.routes"));
router.use("/episode", require("./episode.routes"));

module.exports = router;
