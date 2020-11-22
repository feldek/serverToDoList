const jwt = require("jsonwebtoken");

module.exports.tokenSecretAuth = process.env.TOKEN_SECRET;
module.exports.expiresInAuth = process.env.TOKEN_LIFE;

const refreshTokenSecretAuth = process.env.REFRESH_TOKEN_SECRET;
const refreshExpiresInAuth = process.env.REFRESH_TOKEN_LIFE;

module.exports.recoveryPasswordTokenSecret = process.env.RECOVERY_PASSWORD_TOKEN_SECRET;
const recoveryPasswordExpiresIn = process.env.RECOVERY_PASSWORD_TOKEN_LIFE;

module.exports.generateToken = (targetObject, tokenSecret, expiresIn) => {
  console.log(__filename, "targetObject:", targetObject);
  const token = jwt.sign(targetObject, tokenSecret, {
    expiresIn,
  });
  console.log(__filename, "NEW token:", token);
  return token;
};

module.exports.getTokensAuth = (targetObject) => {
  const tokensAuth = {
    token: this.generateToken(targetObject, this.tokenSecretAuth, this.expiresInAuth),
    refreshToken: this.generateToken(
      targetObject,
      refreshTokenSecretAuth,
      refreshExpiresInAuth
    ),
  };
  return tokensAuth;
};

module.exports.getTokenRecoveryPassword = (targetObject) => {
  return this.generateToken(
    targetObject,
    this.recoveryPasswordTokenSecret,
    recoveryPasswordExpiresIn
  );
};

module.exports.refreshTokensAuth = (req, res) => {
  const header = req.headers;
  let refreshToken = header.authorization && header.authorization.split(" ")[1];
  let newTokens;
  console.log(__filename, "refreshToken:", refreshToken);
  if (!refreshToken) return res.sendStatus(401);
  jwt.verify(refreshToken, refreshTokenSecretAuth, async (err, user) => {
    console.log(__filename, "user:", user);
    if (!err) {
      newTokens = this.getTokensAuth({ id: user.id });
      res.status(200).json(newTokens);
    } else {
      console.log(__filename, "err :", err);
      return res.sendStatus(401);
    }
  });
};
