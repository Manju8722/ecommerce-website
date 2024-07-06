const userMe = (req, res, next) => {
  //   console.log(req.user);
  if (req.user?.id) {
    return next();
  } else {
    return res.status(401).json({ message: "user not logged in yet" });
  }
};

module.exports = userMe;
