const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let User = require('../models/User');

router.post(
  '/',
  [
    check('name', 'name ie required').not().isEmpty(),
    check('email', 'Please enter valid email').not().isEmpty().isEmail(),
    check('password', 'min 5 char is required').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      let newPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
      });

      const payload = {
        user: {
          id: newUser.id,
          name: newUser.name,
        },
      };

      jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:36000},(err,token)=>{
          if(err) throw err
          res.send({token});
      }
      );
    
    } catch (err) {
      return res.status(500).send('Server error');
    }
  }
);

module.exports = router;