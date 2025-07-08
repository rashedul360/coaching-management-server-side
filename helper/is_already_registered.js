const prisma = require('../db');

const is_already_registered = async (email, phone) => {
  try {
    let user = {};
    if (phone && !email) {
      user = await prisma.user.findFirst({
        where: {
          phone_number: phone,
        },
      });
    } else {
      user = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone_number: phone }],
        },
      });
    }

    return {
      user_info: user || undefined,
      is_registered: user?.user_id ? true : false,
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = is_already_registered;
