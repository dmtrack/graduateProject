const express = require("express");
const Episode = require("../models/Episode");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/",  async (req, res) => {
  try {
    const list = await Episode.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "There is a server error occured. Please, try again later",
    });
  }
});

router.patch("/:episodeId", auth, async (req, res) => {
  try {
    const { episodeId } = req.params;
    // if (req.user._id === "6308fa40cc0c7607a9cd5c62") {
    const updatedEpisode = await Episode.findByIdAndUpdate(
      episodeId,
      req.body,
      { new: true }
    );
    res.send(updatedEpisode);
    // } else {
    //   return res
    //     .status(401)
    //     .json({ message: "You have no permission fo this action" });
    // }
  } catch (error) {
    res.status(500).json({
      message: "There is a server error occured. Please, try again later",
    });
  }
});
module.exports = router;
