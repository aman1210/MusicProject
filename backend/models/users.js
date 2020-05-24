const mongoose = require("mongoose");
const emailValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

userSchema.plugin(emailValidator, { message: "Email-Id already exists!" });
module.exports = mongoose.model("User", userSchema);
