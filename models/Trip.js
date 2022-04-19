const mongoose = require('mongoose')
const  Schema = mongoose.Schema;

const tripSchema =  Schema ({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users', 
    },
    name:{
        type: String,
        require: [true,"please add Trip Name"],
    },
    city:{
        type: String,
        require: [true,"please add City"],
    },
    description:{
        type: String,
    },
    startDate:{
        type: Date,
    },
    endDate:{
        type: Date,
    },
    status:{
        type: Boolean,
    },
    img:{
        type: String,
    },
});

module.exports = mongoose.model('Trip',tripSchema);