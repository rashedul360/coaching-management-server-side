const jwt = require('jsonwebtoken');
const prisma = require('../../db');
const shortid = require('shortid');
const insert_branch = async (req, res, next) => {
  const {
    branch_name,
    address,
    city,
    state,
    postal_code,
    branch_phone_number,
    branch_email,
  } = req.body || {};

  try {
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const branch_details = await prisma.branch.create({
      data: {
        branch_id: shortid.generate(),
        branch_name,
        coaching_center_id: decoded.user_info.user_id,
        address,
        city,
        state,
        postal_code,
        branch_phone_number,
        branch_email,
      },
    });
    return res.json(branch_details);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  insert_branch,
};
