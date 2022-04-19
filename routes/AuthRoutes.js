const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

let User = require('../models/User');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message)
    res.status(500).send('server error')
  }
  res.send('token found');
});


router.post(
  '/',
  [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password id required').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      //user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: 'invalid credentials' });
      }

      // compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: 'invalid credentials 2' });
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.send({ token });
        }
      );
    } catch (err) {
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;