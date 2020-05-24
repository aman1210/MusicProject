const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const usersRoute = require("./routes/usersRoute");
const artistsRoute = require("./routes/artistsRoute");
const songsRoute = require("./routes/songsRoute");

const app = express();
mongoose
  .connect(
    "mongodb+srv://soulMusic:mgkd0utoq9rg1T7i@cluster0-xwigq.mongodb.net/soulMusic?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  next();
});

app.use("/api/users", usersRoute);
app.use("/api/songs", songsRoute);
app.use("/api/artists", artistsRoute);

module.exports = app;
