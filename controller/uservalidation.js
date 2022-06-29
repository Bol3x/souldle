const { body } = require('express-validator');

const registerValidation = [
  // Name should not be empty
  body('name').not().isEmpty().withMessage("Username is required."),

  // Password needs to be min 6 chars
  body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),

  // Confirm Password needs to be min 6 chars AND must match the req.body.password field
  body('confirmPass').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords must match.");
      }
      return true;
    })
];

const loginValidation = [
   // Name should not be empty
  body('name').not().isEmpty().withMessage("Username is required."),
  
  // Password should not be empty and needs to be min 6 chars
  body('password').not().isEmpty().withMessage("Password is required.")
];

// update exports
module.exports = { registerValidation, loginValidation };