const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  // Return error if field is empty
  if (!email || !password) {
    return res.status(400).json({msg: 'Email or password can not be empty.'})
  }

  // Check if user with the same email exists
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      })
    })
});



module.exports = router;
