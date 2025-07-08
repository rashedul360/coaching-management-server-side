const all_branches_controller = require('../../controllers/branches/all_branches');
const {
  insert_branch,
} = require('../../controllers/branches/branches_controller');

const branch_router = require('express').Router();

// ----------------all branches-------------
branch_router.get('/branches', all_branches_controller);
// ----------------branch insert-------------
branch_router.post('/branches', insert_branch);
module.exports = branch_router;
