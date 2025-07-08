const prisma = require('../../db');

const bcrypt = require('bcrypt');
const is_already_registered = require('../../helper/is_already_registered');

const user_registration = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body || {};

    const user_information = await is_already_registered(email, phone);
    if (user_information.user_info?.user_id) {
      return res.json({
        message: 'User already registered',
        status: 400,
        success: false,
        error: true,
      });
    }
    const user_id = shortid.generate();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        user_id,
        phone_number: phone,
        password: bcrypt.hashSync(password, 10),
      },
    });
    //     role assign
    await prisma.role.create({
      data: {
        user_id,
        role: 'PERSON',
      },
    });
    return res.json({
      status: 200,
      message: 'user registration successful',
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  user_registration,
};
