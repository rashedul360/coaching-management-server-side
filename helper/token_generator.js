const jwt = require('jsonwebtoken');
const token_generator = (data, expiresIn) => {
  const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn });
  return token;
};

module.exports = token_generator;
