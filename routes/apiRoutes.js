var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the middleware with the local strategy in the config/passport.js
  // If the user has valid login credentials, send them to theAwesomeTimer, Otherwise, send them an error, the front end will cause the redirect
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json("/theAwesomeTimer")
  });

  // Route to sign up a user, the password is hashed in the user.js model and stored by our sequelized User model. If the user is created sucessfully, proceed to log the user in, otherwise send back an error. 
  app.post("/api/signup", function (req, res) {
    console.log(`User signed up with: ${req.body}`);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });

  // Route to log out user back to basic timer
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });


};
