const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const aboutSchema = Schema({

    
    // photo: {
    //     type: String,
    //     require: true,
    // },
    heading: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('About',aboutSchema);