const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
let About = require('../models/About');


const uuid = require('uuid');

const router = express.Router();

const { check, validationResult } = require('express-validator');
const req = require('express/lib/request');
//route Get api/cars
//desc Get all Cars
//access public
router.get('/', async (req, res) => {
  try {
      const aboutDB = await About.find();
      res.send(aboutDB)
  } catch(err){
      return res.status.apply(500).send('Server error');
  }
});



//route Post api/cars
//desc Insert car
//access public
router.post(
  '/',
   [
  //check('photo', 'photo is required').not().isEmpty(),
  check('heading', 'heading is required').not().isEmpty(),
  check('detail', 'detail is required').not().isEmpty(),
], 
async (req, res) => {

    try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
      }

      

        const newAbout = await About.create({
          heading: req.body.heading,
          detail:req.body.detail,
        });
            res.send(newAbout);
         
    } catch(err){
        return res.status(404).send('item not found');
    }
  
  
});



module.exports = router;
