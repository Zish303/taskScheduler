const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.send({
      status: "401",
      message: "Unauthorized!",
    });
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const user = jwt.verify(token, "secret_key");
      req.uid = user.id;
      next();
    } catch (error) {
      res.send({
        status: "401",
        message: "Unauthorized!",
      });
    }
  }
  // next();
};
