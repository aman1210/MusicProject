const express = require("express");
const Artist = require("../models/artists");
const Song = require("../models/songs");

const router = express.Router();

router.put("/:id", (req, res, next) => {
  const artist = new Artist({
    _id: req.body._id,
    artist: req.body.artist,
    artistImage: req.body.artistImage,
    songs: req.body.songs,
  });
  Artist.updateOne({ _id: req.params.id }, artist).then((result) => {
    if (result.n > 0) {
      res.status(200).json({
        message: "Updated Successfully",
      });
    }
  });
});

router.get("", (req, res, next) => {
  Artist.find().then((artist) => {
    res.status(200).json({
      message: "artist fetched",
      artist: artist,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Artist.findById(req.params.id)
    .populate("songs")
    .then((artist) => {
      res.status(200).json(artist);
    })
    .catch((err) => {
      res.status(404).json({ message: "Artist Not Found" });
    });
});

module.exports = router;
