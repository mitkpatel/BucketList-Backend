const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
let Popular = require('../models/Populars');


const uuid = require('uuid');

const router = express.Router();

const { check, validationResult } = require('express-validator');
const req = require('express/lib/request');
//route Get api/cars
//desc Get all Cars
//access public
router.get('/', async (req, res) => {
  try {
      const bucketDB = await Popular.find();
      res.send(bucketDB)
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
  check('title', 'title is required').not().isEmpty(),
  check('location', 'location is required').not().isEmpty(),
  check('category', 'category is required').not().isEmpty(),
  check('budget', 'budget is required').not().isEmpty(),
], 
async (req, res) => {

    try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
      }

        const newBucket = await Popular.create({
          title: req.body.title,
          location:req.body.location,
          category: req.body.category,
          budget: req.body.budget,
        });
            res.send(newBucket);
         
    } catch(err){
        //return res.status(404).send('item not found');
        return res.status(404).send(err);
    }
  
  
});


//route delete api/cars
//desc delete car by id
//access public
router.delete(
    '/', async (req, res) => {
      try {
        
        const popular = await Popular.findOneAndRemove(  req.body.id );
        if (!popular) {
          return res.status(404).send('car not found');
        }
    
        res.send('car deleted');
      } catch (err) {
        return res.status(500).send('Server error');
        
      }
    });

module.exports = router;
