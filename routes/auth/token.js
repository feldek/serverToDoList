const jwt = require("jsonwebtoken");

const tokenSecretAuth = process.env.FELLDEK_TOKEN_SECRET;
const expiresInAuth = process.env.FELLDEK_TOKEN_LIFE;

const refreshTokenSecretAuth = process.env.FELLDEK_REFRESH_TOKEN_SECRET;
const refreshExpiresInAuth = process.env.FELLDEK_REFRESH_TOKEN_LIFE;

const recoveryPasswordTokenSecret = process.env.RECOVERY_PASSWORD_TOKEN_SECRET;
module.exports.recoveryPasswordTokenSecret = recoveryPasswordTokenSecret
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
    token: this.generateToken(targetObject, tokenSecretAuth, expiresInAuth),
    refreshToken: this.generateToken(targetObject, refreshTokenSecretAuth, refreshExpiresInAuth)
  };
  return tokensAuth;
};

module.exports.getTokenRecoveryPassword = (targetObject) => {  
  return this.generateToken(targetObject, recoveryPasswordTokenSecret, recoveryPasswordExpiresIn);
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
