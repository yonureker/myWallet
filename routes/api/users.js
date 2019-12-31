const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.secretOrKeys;

// User Model
const User = require("../../models/User");

// User Sign In
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  // Return error if email or password field is empty
  if (!email || !password) {
    return res.status(400).json({ msg: "Email or password can not be empty." });
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
                token: "Bearer " + token
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
  const { email, password } = req.body;

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
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ password: "Incorrect password" });
      }
    });
  });
});

module.exports = router;
