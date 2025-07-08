const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const login_router = require('./routes/auth/login');
const user_registration_router = require('./routes/registration/user_registration');
const coaching_registration_router = require('./routes/coaching/coaching_registration_router');

const app = express();
const port = 4000;
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
// =================== routes
app.use('/api/v1/', login_router);
app.use('/api/v1/', user_registration_router);
app.use('/api/v1/', coaching_registration_router);
app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
