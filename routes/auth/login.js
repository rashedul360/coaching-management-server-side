const { login_controller } = require('../../controllers/auth/login_controller');

const login_router = require('express').Router();

login_router.post('/login', login_controller);
module.exports = login_router;
