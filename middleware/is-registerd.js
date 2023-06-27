module.exports = (req, res, next) => {
  if (!req.session.email) {
    return res.redirect("/auth/register");
  }
  next();
};
