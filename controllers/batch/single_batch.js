const prisma = require('../../db');

const single_batch_get = async (req, res, next) => {
  try {
    const { id } = req.params || '';
    const data = await prisma.batch.findFirst({
      where: {
        batch_id: id,
      },
      include: {
        students: true,
      },
    });
    if (data?.batch_id) {
      return res.json({
        success: true,
        message: 'batch found',
        error: false,
        status: 200,
        batch: data,
      });
    } else {
      return res.json({
        success: false,
        message: 'batch not found',
        error: true,
        status: 404,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  single_batch_get,
};
