const jwt = require("jsonwebtoken");

const tokenSecret = process.env.FELLDEK_TOKEN_SECRET;
const refreshTokenSecret = process.env.FELLDEK_REFRESH_TOKEN_SECRET;
const expiresIn = process.env.FELLDEK_TOKEN_LIFE;
const refreshExpiresIn = process.env.FELLDEK_REFRESH_TOKEN_LIFE;

module.exports.generateTokens = ({ id }) => {
  console.log(__filename, "id:", id);
  const token = jwt.sign({ id }, tokenSecret, {
    expiresIn,
  });
  console.log(__filename, "NEW token:", token);
  const refreshToken = jwt.sign({ id }, refreshTokenSecret, {
    expiresIn: refreshExpiresIn,
  });
  console.log(__filename, "NEW refreshToken:", refreshToken);
  return { token, refreshToken };
};

module.exports.refreshToken = (req, res) => {
  const header = req.headers;
  let refreshToken = header.authorization && header.authorization.split(" ")[1];
  let newTokens;
  console.log(__filename, "refreshToken:", refreshToken);

  if (!refreshToken) return res.sendStatus(401);
  jwt.verify(refreshToken, refreshTokenSecret, async (err, user) => {
    console.log(__filename, "user:", user);
    if (!err) {
      newTokens = this.generateTokens({ id: user.id });
      res.status(200).json(newTokens);
    } else {
      console.log(__filename, "err :", err);
      return res.sendStatus(401);
    }
  });
};

