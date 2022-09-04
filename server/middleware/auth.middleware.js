const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // формат Bearer sdfsdfewewr
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = tokenService.validateAccessToken(token);
    console.log(data, "data middleware");
    req.user = data;
    next();
    if (!data) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
