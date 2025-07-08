const jwt = require('jsonwebtoken');
const is_already_registered = require('../../helper/is_already_registered');
const security_controller = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token)
      return res.json({
        success: false,
        error: true,
        message: 'Token must be provided',
        status: 400,
      });
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // ✅ Verify token
      const is_logged_in = await is_already_registered(
        decoded?.user_info?.email,
        decoded?.user_info?.phone_number
      );
      req.user = decoded; // Attach decoded info to request
      if (is_logged_in.is_registered) {
        return res.json({
          success: true,
          error: false,
          message: 'Logged-in',
          status: 200,
        });
      } else {
        return res.json({
          success: false,
          error: true,
          message: 'Wrong way access. give us correct data',
          status: 400,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(403).json({ message: 'Invalid token' });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  security_controller,
};
