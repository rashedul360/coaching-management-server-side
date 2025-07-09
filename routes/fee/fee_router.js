const { add_fee } = require('../../controllers/fee/fee_controller');
const { get_all_fees } = require('../../controllers/fee/get_all_fee');

const fee_router = require('express').Router();
fee_router.post('/collection/fee', add_fee);
fee_router.get('/revenues', get_all_fees);
module.exports = fee_router;
