const {
  owner_security_controller,
} = require('../../controllers/security/owner_security_controller');
const {
  security_controller,
} = require('../../controllers/security/security_controller');

const security_router = require('express').Router();

security_router.post('/security', security_controller);
security_router.post('/security/owner', owner_security_controller);
module.exports = security_router;
