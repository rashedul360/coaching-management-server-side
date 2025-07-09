const { get_single_user } = require('../../controllers/user/user_controller');

const user_router = require('express').Router();
user_router.get('/user', get_single_user);

module.exports = user_router;
