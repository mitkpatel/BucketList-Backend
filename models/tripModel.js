const mongoose = require("mongoose");

const tripsSchema = {
    title: String,
    content: String,
    price: String
}

const Trip = mongoose.model("TripRecommended", tripsSchema);

module.exports = Trip;