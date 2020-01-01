const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.secretOrKeys;
const passport = require("passport");

// User Model
const User = require("../../models/User");

// Validations
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// User Sign In
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const { email, password } = req.body;

  // Validation logic
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if user with the same email exists
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    // create a new instance of a User
    const newUser = new User({
      email,
      password
    });

    // creating a hashed version of the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        //save new user and hashed password
        newUser
          .save()
          .then(user => {
            const payload = { id: user.id };

            // sign in user
            jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                id: user.id
              });
            });
          })
          .catch(err => console.log(err));
      });
    });
  });
});

// User Log In
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  const { email, password } = req.body;

  // Validation logic
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "This user does not exist" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Create JWT Payload
        const payload = { id: user.id };

        // JWT Sign
        jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
            id: user.id
          });
        });
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

// Returning current user
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);

module.exports = router;
