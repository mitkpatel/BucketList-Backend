
const express = require('express');
let Trip = require('../models/Trip');


const authMiddleware = require('../Middlewares/authMiddleware')
const router = express.Router();

const {check, validationResult} = require('express-validator');
const req = require('express/lib/request');

//fetch all the trips
router.get('/',authMiddleware,async(req,res)=>{
    try{
      //  const tripDB = await Trip.find();
        const tripDB = await Trip.find({user: req.user.id});
        res.send(tripDB);
    }
    catch(err){
        return res.status(404).send('server error');
    }
});

//get the trip by id
router.get('/:id',async (req,res)=>{
    try{
    const trip = await Trip.findById(req.params.id);
    if (!trip){
        return res.status(404).send('trip not found');
    }
    res.send(trip);
    }
catch(err){
    return res.status(404).send('trip not found');
}
});

// add new trip
router.post(
    '/',
    authMiddleware,
[
    check('name', 'Trip Name ie required').not().isEmpty(),
    check('city', 'city ie required').not().isEmpty(),
],
async(req,res) =>{

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
        console.log('no error')
        const newTrip = await Trip.create({
        user: req.user.id,
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        img: req.body.img,
    });
    res.send(newTrip);
   
}catch(err){
    return res.status(404).send('Trip not created');
}   


    
});

//delete trip by id
router.delete('/', async(req, res) => {
    //find the trip by id
    try{
        const trip = await Trip.findOneAndRemove({_id : req.body.id});
        if (!trip){
            return res.status(404).send('trip not found');
        }
        res.send('Trip Deleted');
        }
    catch(err){
        return res.status(404).send('trip not found');
    }
  });

router.put('/', async(req, res) => {
    
    try{
        const trip = await Trip.findById(req.body.id);
        if (!trip){
            return res.status(404).send('trip not found');
        }
        trip.name = req.body.name;
        trip.city = req.body.city;
        trip.description = req.body.description,
        trip.startDate = req.body.startDate,
        trip.endDate = req.body.endDate, 
        await trip.save();
        res.send(trip);
        }
    catch(err){
        return res.status(404).send('trip not found');
    }
  
   
  });
  

module.exports = router;