var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {

        msg: "Welcome!",
        examples: dbExamples,
        title: "Home"
      });
    });
  });

  // Sign in page
  app.get("/signup", function(req, res) {
    // If the user already has an accout send them to the timer with options
    if (req.user) {
      res.redirect("/theAwesomeTimer");
    }
    res.render("signup", {
      title: "Sign Up"
    });
  });

  app.get("/login", function(req, res) {
    // if user already has an account send themt ot the timer with options
    if (req.user) {
      res.redirect("/theAwesomeTimer");
    }
    res.render("login", {
      title: "Log In"
    });
  });

  //This is where the logged in users will access the real timer with our features
  app.get("/theAwesomeTimer", function(req, res) {
    res.render("theAwesomeTimer", { 
      title: "The REAL Timer"
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
