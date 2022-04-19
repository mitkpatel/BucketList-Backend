const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
let Buckets = require('../models/Buckets');


const uuid = require('uuid');

const router = express.Router();

const { check, validationResult } = require('express-validator');
const req = require('express/lib/request');
//route Get api/cars
//desc Get all Cars
//access public
router.get('/', async (req, res) => {
  try {
      const bucketDB = await Buckets.find();
      res.send(bucketDB)
  } catch(err){
      return res.status.apply(500).send('Server error');
  }
});

// //route Get api/cars/:id
// //desc Get car by id
// //access public
// router.get('/:id', async (req, res) => {
//     try{
//         const car = cars.findById(req.params.id);
//         if (!car) {
//             return res.status(404).send('car not found');
//         }
//         res.send(car);
//     }catch(err){
//         return res.status.apply(500).send('Server error');
//     }
  
// });

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

      const file = req.files.myFile;
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      const path2 = 'public/uploads/' + file.name;

      file.mv(path2, function (err){
        if(err) return res.status(500).send(err);

        //res.send('File uploaded!');
      });

        const newBucket = await Buckets.create({
          title: req.body.title,
          location:req.body.location,
          category: req.body.category,
          budget: req.body.budget,
          photo: file.name,
        });
            res.send(newBucket);
         
    } catch(err){
        return res.status(404).send('item not found');
    }
  
  
});

// //route delete api/cars
// //desc delete car by id
// //access public
// router.delete(
//   '/',
//   authMiddleware,
//   //   [
//   //   check('make', 'make is required').not().isEmpty(),
//   //   check('year', 'year need to be 4 char or more').isLength({
//   //     min: 4,
//   //   }),
//   // ],  
//   async (req, res) => {
//     try {
      
//       const car = await Cars.findOneAndRemove( { user: req.user.id} );
//       if (!car) {
//         return res.status(404).send('car not found');
//       }
  
//       res.send('car deleted');
//     } catch (err) {
//       return res.status(500).send('Server error');
//     }
//   });

// //route put api/cars
// //desc update car
// //access public
// router.put(
//   '/', 
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const car = await Cars.findById({ user: req.user.id});
//       if (!car) {
//         return res.status(404).send('car not found');
//       }
//       car.make = req.body.make;
//       car.model = req.body.model;
//       car.year = req.body.year;
//       await car.save();
//       res.send(car);
//     } catch (err) {
//       return res.status(500).send('Server error');
//     }
  // });

module.exports = router;
