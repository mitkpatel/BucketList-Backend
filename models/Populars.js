const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const popularSchema = Schema({

    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users',
    // },
    // make: {
    //     type: String,
    //     require: true,
    // },
    // model: {
    //     type: String,
    //     require: true,
    // },
    // year: {
    //     type: String,
    //     require: true,
    // },

    
    title: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    budget: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Populars',popularSchema);