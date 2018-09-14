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

  // POST request in order to add new user to database
  app.post("/api/signup", function (req, res) {
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

  // POST request to Spotify API in order to add a new song to playlist 'Focus'
  app.post("/api/spotify", function(req, res) {
    console.log(req.body);
    spotify.search({type: 'track', query: req.body.songName}, function(err, data){
      if(err) {
          console.log('Error occurred: ' + err);
      }
      // Authorization token for Spotify. Must refresh new token every hour.
      var token = "BQAdcUHOtlvtRHXl1QWWh1Wwf1pajcA3oRpCkxXEQxS5Q3SO2FDz3vlR8ffanXH_AqfSa6QIeNqxRR_AlqeMnEFZ1sNG1Rn_bcpBI7pMzwz3gd7QzR8lvLnTHapGJ0mMkB4C0tPN-DJKObJvbRH7OdzrwSZ2tINvo5wXB6utIa5rjta0NWI";

      // AJAX call using npm fetch
      fetch('https://api.spotify.com/v1/playlists/24eowb9lZkZezxXVxpm4cp/tracks?uris=' + data.tracks.items[0].uri, {
          headers: {
              'Authorization': "Bearer " + token
          },
          contentType: 'application/json',
          method: 'POST'
      }).then(success => {
        console.log(success);

        // Reload the awesome timer page to display new songs on spotify playlist on screen
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
