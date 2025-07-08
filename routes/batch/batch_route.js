const {
  all_batches_controller,
} = require('../../controllers/batch/all_batches');
const { insert_batch } = require('../../controllers/batch/insert_batche');

const batch_router = require('express').Router();
batch_router.post('/batches', insert_batch);
batch_router.get('/batches', all_batches_controller);
module.exports = batch_router;
