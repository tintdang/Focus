var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log("hit api/login post route");

    res.json("/theAwesomeTimer");
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

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};
