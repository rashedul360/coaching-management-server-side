const {
  user_registration,
} = require('../../controllers/registratiion/user_registration');

const user_registration_router = require('express').Router();

user_registration_router.post('/registration/user', user_registration);
module.exports = user_registration_router;
