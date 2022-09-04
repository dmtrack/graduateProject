const express = require("express");
const Segment = require("../models/Segment");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Segment.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "There is a server error occured. Please, try again later",
    });
  }
});
module.exports = router;
