const shortid = require('shortid');
const prisma = require('../../db');

const insert_batch = async (req, res, next) => {
  try {
    const {
      batch_name,
      start_date,
      end_date,
      batch_type,
      batch_fee,
      available_seat,
      schedules,
      branch_and_center_id,
    } = req.body || {};
    const batch_id = shortid.generate();
    const coaching_center_id = branch_and_center_id?.split('__BACID__')[1];
    const branch_id = branch_and_center_id?.split('__BACID__')[0];
    await prisma.batch.create({
      data: {
        batch_id,
        batch_name,
        start_date,
        end_date,
        batch_fee,
        batch_type,
        available_seats: available_seat,
        coaching_center_id,
        branch_id,
      },
    });
    if (schedules?.length > 0) {
      schedules.map(async (scd) => {
        await prisma.batch_schedule.create({
          data: {
            schedule_id: shortid.generate(),
            batch_id,
            name_bn: scd.name_bn,
            name_en: scd.name_en,
            batch_id,
          },
        });
      });
    }
    return res.json({
      message: 'batch created',
      success: true,
      error: false,
      status: 201,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  insert_batch,
};
