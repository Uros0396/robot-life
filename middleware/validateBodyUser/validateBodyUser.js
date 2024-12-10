const validateBodyUser = (req, res, next) => {
  const errors = [];

  const { name, surname, email, dob, username, password, role } = req.body;
  console.log(req.body);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("The Email is Not Valid");
  }

  if (typeof role !== "string") {
    errors.push("Role must be a string");
  }

  if (typeof password !== "string" || password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  if (isNaN(Date.parse(dob))) {
    errors.push("Insert a valid Date of Birth");
  }

  if (typeof name !== "string" || name.length < 3) {
    errors.push("Name must be a string and at least 3 characters long");
  }

  if (typeof surname !== "string" || surname.length < 3) {
    errors.push("Surname must be a string and at least 3 characters long");
  }

  if (typeof username !== "string" || username.length < 3) {
    errors.push("Username must be a string and at least 3 characters long");
  }

  if (errors.length > 0) {
    return res.status(400).send({
      statusCode: 400,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = validateBodyUser;
