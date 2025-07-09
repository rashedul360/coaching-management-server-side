const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const login_router = require('./routes/auth/login');
const user_registration_router = require('./routes/registration/user_registration');
const coaching_registration_router = require('./routes/coaching/coaching_registration_router');
const security_router = require('./routes/security/security_routes');
const logout_router = require('./routes/auth/logout');
const branch_router = require('./routes/branches/branch_route');
const batch_router = require('./routes/batch/batch_route');
const single_batch_router = require('./routes/batch/single_batch');
const student_router = require('./routes/student/student_router');
const fee_router = require('./routes/fee/fee_router');
const user_router = require('./routes/user/user_router');

const app = express();
const port = 4000;
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
// =================== routes
app.use('/api/v1/', login_router);
app.use('/api/v1/', user_registration_router);
app.use('/api/v1/', coaching_registration_router);
app.use('/api/v1/', security_router);
app.use('/api/v1/', logout_router);
app.use('/api/v1/', branch_router);
app.use('/api/v1/', batch_router);
app.use('/api/v1/', single_batch_router);
app.use('/api/v1/', student_router);
app.use('/api/v1/', fee_router);
app.use('/api/v1/', user_router);
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
