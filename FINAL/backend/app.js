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

//start up with express
const app = express()
app.use(express.json());   //for post-express call
app.use(cors());
app.use(cookieParser());

app.use(session({
    secret: 'whatttsupppDawggggg',
    resave: false,
    saveUninitialized: true,
}));



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

app.post('/logout', (req, res) => {
    
    // Destroy the session to log the user out
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error during logout' });
        }

        // Clear localStorage on the client side
        res.json({ message: 'Logout successful', clearLocalStorage: true });
    });
});



//end
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening to PORT', port));