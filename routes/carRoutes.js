
const express = require('express');
let cars = require('../models/cars2');
const uuid = require('uuid');

const router = express.Router();

//fetch all the cars
router.get('/',(req,res)=>{
    res.json(cars);
});

//get the car by id
router.get('/:id',(req,res)=>{
    const car = cars.find((item)=> item.id == req.params.id);

    if (!car){
        return res.status(404).send('car not found');
    }
    res.send(car);
   
});

// add new car
router.post('/',(req,res) =>{

    if(!req.body.make){
        return res.status(400).json({error:'Missing make'})
    }
    else  if(!req.body.model){
        return res.status(400).json({error:'Missing model'})
    }
    else  if(!req.body.year){
        return res.status(400).json({error:'Missing year'})
    }
    else{
        const newCar ={
            id: uuid.v4(),
            make: req.body.make,
            model: req.body.model,
            year: req.body.year
        };
        cars.push(newCar);
        res.send(cars);
    }
});

//delete car by id
router.delete('/', (req, res) => {
    //find the todo by id
    const car = cars.find((item) => item.id == req.body.id);
    if (!car) {
      return res.status(400).json({ error: 'Car not found Check the Id again !' });
    }
  
    cars = cars.filter((item) => item.id !== car.id);
  
    res.send(cars);
  });

  router.put('/', (req, res) => {
    
    const car = cars.find((item) => item.id == req.body.id);
    if (!car) {
      return res.status(400).json({ error: 'Car not found Check the Id again !' });
    }
  
    cars = cars.filter((item) => {
      if (item.id == req.body.id) {
        (item.make = req.body.make),
          (item.model = req.body.model),
          (item.year = req.body.year);
      }
      return item;
    });
    res.send(cars);
  });
  

module.exports = router;