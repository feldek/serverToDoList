const jwt = require("jsonwebtoken");

const tokenSecretAuth = process.env.TOKEN_SECRET;
const expiresInAuth = process.env.TOKEN_LIFE;

const refreshTokenSecretAuth = process.env.REFRESH_TOKEN_SECRET;
const refreshExpiresInAuth = process.env.REFRESH_TOKEN_LIFE;

const recoveryPasswordTokenSecret = process.env.RECOVERY_PASSWORD_TOKEN_SECRET;
const recoveryPasswordExpiresIn = process.env.RECOVERY_PASSWORD_TOKEN_LIFE;

const generateToken = (targetObject, tokenSecret, expiresIn) => {
  console.log(__filename, "targetObject:", targetObject);
  const token = jwt.sign(targetObject, tokenSecret, {
    expiresIn,
  });
  console.log(__filename, "NEW token:", token);
  return token;
};

const getTokensAuth = (targetObject) => {
  const tokensAuth = {
    token: generateToken(targetObject, tokenSecretAuth, expiresInAuth),
    refreshToken: generateToken(
      targetObject,
      refreshTokenSecretAuth,
      refreshExpiresInAuth
    ),
  };
  return tokensAuth;
};

const getTokenRecoveryPassword = (targetObject) => {
  return generateToken(
    targetObject,
    recoveryPasswordTokenSecret,
    recoveryPasswordExpiresIn
  );
};

const refreshTokensAuth = async (req, res) => {
  try {
    const header = req.headers;
    let refreshToken = header.authorization && header.authorization.split(" ")[1];
    console.log(__filename, "refreshToken:", refreshToken);
    if (!refreshToken) {
      return res.status(401).json({});
    }
    const user = await jwtVerify(refreshToken, refreshTokenSecretAuth);
    console.log(__filename, "user:", user);
    let newTokens = getTokensAuth({ id: user.id });
    res.status(200).json(newTokens);
  } catch (err) {
    console.log(err);
    res.status(401).json({});
  }
};

const jwtVerify = (token, tokenSecret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, async (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

module.exports = {
  tokenSecretAuth,
  expiresInAuth,
  recoveryPasswordTokenSecret,
  generateToken,
  getTokensAuth,
  getTokenRecoveryPassword,
  refreshTokensAuth,
  jwtVerify,
};
