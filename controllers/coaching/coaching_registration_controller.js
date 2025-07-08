const shortid = require('shortid');
const bcrypt = require('bcrypt');
const prisma = require('../../db');
const is_already_registered = require('../../helper/is_already_registered');

const registration_coaching = async (req, res, next) => {
  try {
    const {
      name,
      address,
      city,
      state,
      postal_code,
      center_phone_number,
      center_email,
      website,
      established,
      subdomain,
      primary_contact_person_name,
      primary_contact_person_position,
      primary_contact_person_phone,
      primary_contact_person_email,
      subjects,
      levels,
      password,
    } = req.body || {};
    // =============================
    const coaching_center_id = shortid.generate();
    const coaching_center_details = await prisma.coaching_center.create({
      data: {
        coaching_center_id,
        name,
        address,
        city,
        state,
        postal_code,
        center_phone_number,
        center_email,
        website,
        established,
        subdomain,
      },
    });
    const { user_info, is_registered } = is_already_registered(
      center_email,
      center_phone_number
    );
    if (!is_registered)
      return res.json({
        success: false,
        error: true,
        message: 'ALready registered with phone and email',
        status: 400,
      });
    // create account
    await prisma.user.create({
      data: {
        user_id: shortid.generate(),
        name,
        email: center_email,
        phone_number: center_phone_number,
        password: bcrypt.hashSync(password, 10),
        ac_type: 'COACHING',
      },
    });
    // subjects
    subjects?.map(async (subject) => {
      await prisma.coaching_center_subject.create({
        data: {
          subject_id: shortid.generate(),
          coaching_center_id,
          subject_name: subject,
        },
      });
    });
    // education level
    levels?.map(async (level) => {
      await prisma.education_level.create({
        data: {
          level_id: shortid.generate(),
          coaching_center_id,
          level_name: level,
        },
      });
    });
    if (coaching_center_details?.coaching_center_id) {
      return res.json({
        success: true,
        error: false,
        message: 'successfully registered',
        status: 201,
      });
    } else {
      return res.json({
        success: false,
        error: true,
        message: 'registration not successful',
        status: 400,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registration_coaching };
