const isAdmin = (req, res, next) => {
  console.log("req.user is", req.user);
  if (req.user && req.user.role === "admin") {
    next(); // If user is admin, proceed to next middleware
  } else {
    return res.status(403).json({ message: "Unauthorized access" });
  }
};

module.exports = isAdmin;
