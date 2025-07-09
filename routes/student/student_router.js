const {
  add_student_controller,
} = require('../../controllers/student/add_student_controller');
const { total_students } = require('../../controllers/student/total_students');

const student_router = require('express').Router();
student_router.post('/student/add', add_student_controller);
student_router.get('/students', total_students);
module.exports = student_router;
