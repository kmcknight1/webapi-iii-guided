module.exports = function gate(req, res, next) {
  const password = req.headers.password;

  if (password && password === "melon") {
    next();
  } else {
    next(401);
  }
};
