const express = require("express");
const router = express.Router();
const Home = require("../models/homeModel");

router.route('/gethomedata').get((req, res) => {
    Home.find()
    .then(foundHome => res.json(foundHome));
});

 module.exports = router;