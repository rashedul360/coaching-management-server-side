const {
  registration_coaching,
} = require('../../controllers/coaching/coaching_registration_controller');

const coaching_registration_router = require('express').Router();

coaching_registration_router.post('/register/coaching', registration_coaching);
module.exports = coaching_registration_router;
