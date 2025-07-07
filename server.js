const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const prisma = require('./db');

const app = express();
const port = 3000;
app.use(cors());
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alicesdfsdsadfdgsd@prisma.io',
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
