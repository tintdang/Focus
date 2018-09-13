// This is middleware for restricting the user to not access our specialized timer if not logged in.
module.exports = function (req, res, next) {
    // if the user is logged in, contintue with the request to the specialized timer.
    if (req.user) {
        return next();
    }
    // if they aren't logged in just send them over to sign up.
    return res.redirect("/");
};