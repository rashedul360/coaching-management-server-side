const { PrismaClient } = require('@prisma/client'); // অথবা '@prisma/client' যদি default path use করেন

const prisma = new PrismaClient();

module.exports = prisma;
