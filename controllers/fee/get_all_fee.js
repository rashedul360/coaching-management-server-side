const prisma = require('../../db');
const jwt = require('jsonwebtoken');
const get_all_fees = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const fees = await prisma.revenue.findMany({
      where: {
        coaching_center_id: decoded?.user_info?.user_id,
      },
    });

    let total_revenue = 0;
    let total_expense = 0;
    fees.map((fee) => {
      total_revenue += Number(fee.amount);
    });
    if (fees) {
      return res.json({
        success: true,
        status: 200,
        error: false,
        message: 'all revenues for this couching center',
        //    revenues: fees,
        total_revenue,
        total_expense,
      });
    } else {
      return res.json({
        success: false,
        status: 400,
        error: true,
        message: 'something went wrong',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  get_all_fees,
};
