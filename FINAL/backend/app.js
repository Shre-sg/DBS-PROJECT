//start
const Joi = require('joi');
const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');


const loginRoutes = require('./module/login');
const registerRouter = require("./module/register");
const avionicsRouter = require("./module/avionics");
const recoveryRouter = require("./module/recovery");
const aerostructuresRouter = require("./module/aerostructures");
const payloadRouter = require("./module/payload");
const propulsionRouter = require("./module/propulsion");
const costRouter = require('./module/cost'); 
const dataRouter = require('./module/data'); 
const logoutRouter = require('./module/logout');

//start up with express
const app = express()
app.use(express.json());   //for post-express call
app.use(cors());
app.use(cookieParser());


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });
  
// app.use(session({
//     secret: 'whatttsupppDawggggg',
//     resave: false,
//     saveUninitialized: true,
// }));



//content
app.get('/', (req, res)=> {
    res.send('Hello World');
});

//content.login
app.use('/login', loginRoutes);
app.use('/register', registerRouter);
app.use('/avionics', avionicsRouter );
app.use('/recovery', recoveryRouter );
app.use('/aerostructures', aerostructuresRouter );
app.use('/payload', payloadRouter );
app.use('/propulsion', propulsionRouter );
app.use('/cost', costRouter);
app.use('/data', dataRouter);
app.use('/logout', logoutRouter);


//end
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening to PORT', port));