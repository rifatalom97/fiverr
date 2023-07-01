const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  if (req.cookies?.[process.env.COOKIE_NAME]) {
    try {
      const decoded_token = await jwt.verify(
        req.cookies[process.env.COOKIE_NAME],
        process.env.JWT_KEY
      );
      if (decoded_token && decoded_token.id) {
        req.userId = decoded_token.id;
        next();
      } else {
        throw new Error("Token is not valid");
      }
    } catch (error) {
      res.status(400).send("Token is not valid");
    }
  } else {
    res.status(404).send("Token not found");
  }
};
module.exports = verifyToken;
