const shortid = require('shortid');
const prisma = require('../../db');

const add_student_controller = async (req, res, next) => {
  try {
    const {
      name,
      coaching_center_id,
      branch_id,
      batch_id,
      phone_number,
      email,
    } = req.body || {};
    const student = await prisma.batch_student.create({
      data: {
        student_id: shortid.generate(),
        name,
        coaching_center_id,
        branch_id,
        batch_id,
        phone_number,
        email,
      },
    });
    if (student?.student_id) {
      return res.json({
        success: true,
        message: 'student added',
        error: false,
        status: 200,
        batch: student,
      });
    } else {
      return res.json({
        success: false,
        message: 'student not added',
        error: true,
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  add_student_controller,
};
