const bcrypt = require('bcrypt');
const prisma = require('../../db');

const is_already_registered = require('../../helper/is_already_registered');
const token_generator = require('../../helper/token_generator');
const cookie_setter = require('../../helper/cookie_setter');

const login_controller = async (req, res, next) => {
  try {
    const { phone, password } = req.body || {};
    let { user_info, is_registered } = await is_already_registered(null, phone);
    if (is_registered) {
      const is_correct_pass = bcrypt.compareSync(password, user_info?.password);

      if (is_correct_pass) {
        const token = token_generator({ user_info }, '1d');
        await cookie_setter('access_token', token, res);
        return res.json({
          success: true,
          status: 200,
          user_info,
          is_registered,
          login_success: true,
        });
      } else {
        return res.json({
          success: false,
          status: 400,
          login_success: false,
          error: true,
          message: 'Password Incorrect',
        });
      }
    } else {
      return res.json({
        success: false,
        status: 400,
        login_success: false,
        error: true,
        message: 'User not registered',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  login_controller,
};
