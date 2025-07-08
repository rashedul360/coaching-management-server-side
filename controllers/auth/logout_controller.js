const logout_controller = async (req, res, next) => {
  try {
    res.clearCookie('access_token', {
      path: '/',
      httpOnly: true,
      // sameSite: 'Strict', // If it was set before
    });
    res.json({
      success: true,
      error: false,
      message: 'outout successful',
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = logout_controller;
