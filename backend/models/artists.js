const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
  artist: { type: String, required: true },
  artistImage: { type: String },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

module.exports = mongoose.model("Artist", artistSchema);
