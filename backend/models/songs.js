const mongoose = require("mongoose");

const songsSchema = mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  albumArt: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, required: true },
});

module.exports = mongoose.model("Song", songsSchema);
