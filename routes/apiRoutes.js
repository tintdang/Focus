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

    res.json("/home");
  });

  app.post("/api/signup", function (req, res) {
    // check if user email is created.
    // console.log(req.body);
    db.User.findOne({
      where: {email: req.body.email}
    }).then(function(existingEmail) {
      if (existingEmail) {
        return res.json(`The email: ${req.body.email} has been taken`)
      } else {
        db.User.create({
          email: req.body.email,
          password: req.body.password
        }).then(function () {
          res.redirect(307, "/api/login");
        }).catch(function (err) {
          console.log(err);
          res.json(err);
        });
      }
    });
  });

  app.post("/api/spotify", function(req, res) {
    console.log(req.body);
    spotify.search({type: 'track', query: req.body.songName}, function(err, data){
      if(err) {
          console.log('Error occurred: ' + err);
      }

      console.log(data.tracks.items[0].uri);
      var token = "BQDYS6aOFrCGXIuf3MmT67No-QrYVSZBhgRhqhgupRpIISYzCNP9EG1D-qPA9gER_Ln12vuLJYX-_lSFPijre7ZwueJfckBxoxNXcZodmM-Xv_hKec4jEdGXL9OdKrepFoXBvhQfpTCQvjtQP2aaaZRo5Vshu0DLyY-SMz5FoqztKG6sq60";

      fetch('https://api.spotify.com/v1/playlists/24eowb9lZkZezxXVxpm4cp/tracks?uris=' + data.tracks.items[0].uri, {
          headers: {
              'Authorization': "Bearer " + token
          },
          contentType: 'application/json',
          method: 'POST'
      }).then(success => {
        console.log(success);
        res.json("/theAwesomeTimer");
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
