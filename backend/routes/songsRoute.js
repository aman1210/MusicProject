const express = require("express");
const Song = require("../models/songs");
const Artist = require("../models/artists");
const User = require("../models/users");

const authStatus = require("../middleware/authStatus");
const router = express.Router();

router.post("", (req, res, next) => {
  const song = new Song({
    name: req.body.name,
    album: req.body.album,
    albumArt: req.body.albumArt,
    artist: req.body.artist,
    url: req.body.url,
    likes: req.body.likes,
  });
  Artist.findOne({ artist: req.body.artist }, (err, res) => {
    if (!res) {
      const artist = new Artist({
        artist: req.body.artist,
      });
      artist.songs.push(song);
      artist.save();
    } else {
      res.songs.push(song);
      res.save();
    }
  });
  song.save();
  res.status(200).json({
    message: "post created",
  });
});

router.put("/:id", authStatus, (req, res, next) => {
  const song = new Song({
    _id: req.body._id,
    name: req.body.name,
    album: req.body.album,
    albumArt: req.body.albumArt,
    artist: req.body.artist,
    url: req.body.url,
    likes: req.body.likes,
  });
  Song.updateOne({ _id: req.params.id }, song).then((result) => {
    let resultSave = result;
    User.findOne({ _id: req.userData.userId }, (err, artist) => {
      artist.liked.push(song);
      artist.save();
      let liked = artist.liked;
      if (resultSave.n > 0) {
        res.status(200).json({
          message: "Updated",
          liked: liked,
        });
      }
    });
  });
});

router.get("", (req, res, next) => {
  Song.find().then((songs2) => {
    res.send({
      message: "hello",
      songs: songs2,
    });
  });
});

module.exports = router;
