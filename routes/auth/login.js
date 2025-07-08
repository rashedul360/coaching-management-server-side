const login_router = require('express').Router();
const { login_controller } = require('../../controllers/auth/login_controller');

login_router.post('/login', login_controller);
module.exports = login_router;
