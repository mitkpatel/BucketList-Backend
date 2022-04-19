const mongoose = require("mongoose");

const homeSchema = {
    id: Number,
    title: String,
    desc: String
}

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;