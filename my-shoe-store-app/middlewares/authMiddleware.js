const jwt = require("jsonwebtoken");
const config = require("../config/jwt");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Token ausente." });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido." });
  }
};
