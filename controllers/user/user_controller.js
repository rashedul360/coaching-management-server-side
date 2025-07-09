const jwt = require('jsonwebtoken');
const prisma = require('../../db');
const get_single_user = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      const user = await prisma.user.findFirst({
        where: {
          user_id: decoded?.user_info?.user_id,
        },
      });

      if (user) {
        return res.json({
          success: true,
          error: false,
          message: 'user found',
          user,
        });
      } else {
        return res.json({
          success: false,
          error: true,
          message: 'user  not found',
          user,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  get_single_user,
};
