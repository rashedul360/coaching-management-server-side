const prisma = require('../../db');
const jwt = require('jsonwebtoken');
const all_batches_controller = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const data = await prisma.batch.findMany({
      where: {
        coaching_center_id: decoded?.user_info?.user_id,
      },
      include: {
        schedules: true,
        students: true,
      },
    });
    return res.json({
      success: true,
      error: false,
      batches: data,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  all_batches_controller,
};
