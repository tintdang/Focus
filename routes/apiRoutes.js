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
      var token = "BQCOx7Vj3R-X2SceSlrLW1--engdy3TZ-7fwsnypqXlQ46ofV25Y-pRZOmavj51VW52Lx9QEU2IBiYncgUyMZdCIB6NRI8K-YIwAyFwHXse69mYjwrBPurtio8WNjf6Ky_LRiSTfTpgSqptWvY7MfRI6vAAVnoHzjiLREWdtoxoPQMSfbPo";

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
