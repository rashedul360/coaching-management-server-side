const { single_batch_get } = require('../../controllers/batch/single_batch');

const single_batch_router = require('express').Router();
single_batch_router.get('/batch/:id', single_batch_get);
module.exports = single_batch_router;
