// This is middleware for restricting the user to not access our specialized timer if not logged in.
modules.exports = function (req, res, next) {
  // if the user is logged in, contintue with the request to the specialized timer.
  if (req.user) {
    return next();
  }
  return res.redirect("/signup");
};