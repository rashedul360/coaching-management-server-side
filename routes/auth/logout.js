const logout_controller = require('../../controllers/auth/logout_controller');

const logout_router = require('express').Router();

logout_router.get('/logout', logout_controller);
module.exports = logout_router;
