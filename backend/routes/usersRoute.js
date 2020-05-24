const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const authStatus = require("../middleware/authStatus");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created",
          user: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          err: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let userSave;
  let admin;
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "Invalid email-id or password",
      });
    }
    userSave = user;
    return bcrypt.compare(req.body.password, user.password).then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Invalid email-id or password",
        });
      }
      const token = jwt.sign(
        { email: userSave.email, userId: userSave._id },
        "this_is_the_sceret_key_by_@man_sriv@stava",
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({
        token: token,
        expiresIn: 24,
        userId: userSave._id,
        liked: userSave.liked,
        playlist: userSave.playlist,
        admin: admin,
      });
    });
  });
});

router.put("/playlist", authStatus, (req, res, next) => {
  User.findOne({ _id: req.userData.userId }, (err, user) => {
    user.playlist = req.body;
    user.save();
    res.status(200).json({
      message: "Playlist Saved",
      user: user,
    });
  });
});

module.exports = router;
