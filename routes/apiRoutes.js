var db = require("../models");
var passport = require("../config/passport");
require("dotenv").config();
var keys = require("../keys");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fetch = require("node-fetch");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log("hit api/login post route");

    res.json("/theAwesomeTimer");
  });

  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  app.post("/api/spotify", function(req, res) {
    console.log(req.body);
    spotify.search({type: 'track', query: req.body.songName}, function(err, data){
      if(err) {
          console.log('Error occurred: ' + err);
      }

      console.log(data.tracks.items[0].uri);
      var token = "BQD-hx-R5anxqTmXsmDMAQT3vPHZFO-nZSNA8DBaoH7EN9Hu4wbkBreO69W0_DHA1Vw6Nfyf90FKUgjWl8XZenaftMg6IneJpqqQBLGd0DQm4SAMXIDoU3ueROsfccOu9Ho3KE7TQfJxTevL3K19rVG9Vozed0i7LoMaC58gZ7PFmlukpnA";

      fetch('https://api.spotify.com/v1/playlists/24eowb9lZkZezxXVxpm4cp/tracks?uris=' + data.tracks.items[0].uri, {
          headers: {
              'Authorization': "Bearer " + token
          },
          contentType: 'application/json',
          method: 'POST'
      }).then(success => {
      console.log(success);
      }).catch(err => {
          console.log('here is your error', err);
      })
  })
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};
