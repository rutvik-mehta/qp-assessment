const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    const decoded = jwt.decode(token);

    if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ error: "Token expired, please re-login" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
