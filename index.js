const express = require('express');
const dotenv = require ('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const userRoute = require ('./routes/UserRoutes');
const authRoute = require ('./routes/AuthRoutes');
const tripRoute = require ('./routes/tripRoutes');
const tripRecRoute = require ('./routes/tripRecRoute');
const homeRoute = require ('./routes/homeRoute');
const aboutRoute = require ('./routes/aboutRoutesDB');
const bucketRoute = require ('./routes/bucketRoutesDB');
const popularRoute = require ('./routes/popularRoutes');
const connectDB = require ('./config/connectDB');
const app = express();
app.use(cors());

//connect to DB
connectDB();

app.use(express.json());

app.use('/api/trips',tripRoute);
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/tripRecRoutes',tripRecRoute);
app.use('/api/home',homeRoute);
app.use('/api/about',aboutRoute);
app.use('/api/bucket',bucketRoute);
app.use('/api/popular',popularRoute);


app.use(fileUpload());
app.use(express.static('public'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log('server started');
}
);