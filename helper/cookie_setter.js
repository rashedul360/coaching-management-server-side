const cookie_setter = (name, data, res, maxAge) => {
  res.cookie(name, data, {
    maxAge: maxAge || 24 * 60 * 60 * 1000, // 1 day in milliseconds
    //     httpOnly: true,
    secure: false,
  });
};

module.exports = cookie_setter;
