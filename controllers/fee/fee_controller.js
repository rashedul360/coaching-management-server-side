const shortid = require('shortid');
const prisma = require('../../db');
const is_already_registered = require('../../helper/is_already_registered');

const add_fee = async (req, res, next) => {
  try {
    const { phone_number, amount, fee_type } = req.body || {};
    const user_data = await prisma.batch_student.findFirst({
      where: {
        phone_number,
      },
    });

    if (user_data) {
      const branch_data = await prisma.batch_student.findFirst({
        where: {
          phone_number,
        },
      });
      const fee_data = await prisma.revenue.create({
        data: {
          revenue_id: shortid.generate(),
          student_id: user_data.student_id,
          student_name: user_data.name,
          coaching_center_id: branch_data.coaching_center_id,
          branch_id: branch_data.branch_id,
          batch_id: branch_data.batch_id,
          phone_number,
          amount,
          payment_method: fee_type,
        },
      });
      if (fee_data.revenue_id) {
        return res.json({
          success: true,
          error: false,
          message: 'Fee collected successfully',
          status: 201,
        });
      }
    } else {
      return res.json({
        success: false,
        error: true,
        message: 'this student not enrolled program',
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  add_fee,
};
