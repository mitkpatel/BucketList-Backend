const express = require("express");
const router = express.Router();
const Trip = require("../models/tripModel");

router.route("/createtrip").post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const price = req.body.price;
    const newTrip = new Trip({
        title,
        content,
        price
    });

    newTrip.save();
});

router.route('/gettrips').get((req, res) => {
    Trip.find()
    .then(foundTrip => res.json(foundTrip));
});

 module.exports = router;