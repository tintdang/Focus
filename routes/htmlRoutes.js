var db = require("../models");
// requring the custom middleware to check if the user is logged in.
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!",
      title: "Home",
      customcss: `<link rel="stylesheet" href="/styles/timer.css"></link>`,
      customjs: `<script type="text/javascript" src="/js/timer.js"></script>\n<script type="text/javascript" src="/js/index.js"></script>`
    });
  });


  // Sign in page
  app.get("/signup", function (req, res) {
    // If the user already has an accout send them to the timer with options
    if (req.user) {
      res.redirect("/theAwesomeTimer");
    }
    res.render("signup", {
      title: "Sign Up",
      customcss: `<link rel="stylesheet" href="/styles/form.css"></link>`,
      customjs: `<script type="text/javascript" src="/js/signup.js"></script>`
    });
  });

  app.get("/login", function (req, res) {
    // if user already has an account send themt ot the timer with options
    if (req.user) {
      res.redirect("/theAwesomeTimer");
    }
    res.render("login", {
      title: "Log In",
      customcss: `<link rel="stylesheet" href="/styles/form.css"></link>`,
      customjs: `<script type="text/javascript" src="/js/login.js"></script>`
    });
  });

  //This is where the logged in users will access the real timer with our features
  //The middleware prevents anybody trying to access the URL directly to be redirected to the signup page
  app.get("/theAwesomeTimer", isAuthenticated, function (req, res) {
    res.render("theAwesomeTimer", {
      title: "The REAL Timer",
      customcss: `<link rel="stylesheet" href="/styles/timer.css"></link>`,
      customjs: `<script type="text/javascript" src="/js/theAwesomeTimer.js"></script>`
    });

  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
