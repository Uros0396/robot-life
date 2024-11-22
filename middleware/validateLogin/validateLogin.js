const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      statusCode: 400,
      message: "Email and password are required.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({
      statusCode: 400,
      message: "Please provide a valid email address.",
    });
  }

  if (password.length < 6) {
    return res.status(400).send({
      statusCode: 400,
      message: "Password must be at least 6 characters long.",
    });
  }

  next();
};

module.exports = validateLogin;
