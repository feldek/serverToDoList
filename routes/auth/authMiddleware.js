const jwt = require("jsonwebtoken");
const tokenSecret = process.env.FELLDEK_TOKEN_SECRET;

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers;
  const token = authHeader.authorization && authHeader.authorization.split(" ")[1];  

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, tokenSecret, async (err, user) => {
    console.log(__filename, "user:", user);
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log(__filename, "err TokenExpiredError:", err);
        return res.sendStatus(403);
      } else {
        console.log(__filename, "err:", err);
        return res.sendStatus(401);
      }
    }
    req.user = user;
    next();
  });
};
