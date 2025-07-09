const prisma = require('../../db');
const jwt = require('jsonwebtoken');
const total_students = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const students = await prisma.batch_student.findMany({
      where: {
        coaching_center_id: decoded.user_info.user_id,
      },
    });
    if (students) {
      return res.json({
        success: true,
        error: false,
        status: 200,
        message: 'all student found ',
        students,
      });
    } else {
      return res.json({
        success: false,
        error: true,
        status: 404,
        message: 'not student found ',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  total_students,
};
