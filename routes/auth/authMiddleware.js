const { jwtVerify } = require("./token");
const tokenSecret = process.env.TOKEN_SECRET;

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers;
  const token = authHeader.authorization && authHeader.authorization.split(" ")[1];

  if (token == null) {
    res.status(401).json({});
  }
  try {
    const user = await jwtVerify(token, tokenSecret);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      res.status(403).json({});
    } else {
      res.status(401).json({});
    }
  }
};

module.exports = authenticateToken;
