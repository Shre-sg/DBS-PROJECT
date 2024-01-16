//start
const Joi = require('joi');
const express = require('express');
const mysql = require('mysql');
const cors = require("cors");


const loginRoutes = require('./module/login');
const registerRouter = require("./module/register");

//start up with express
const app = express()
app.use(express.json());   //for post-express call
app.use(cors());



//content
app.get('/', (req, res)=> {
    res.send('Hello World');
});

//content.login
app.use('/login', loginRoutes);
app.use('/register', registerRouter);

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
app.listen(port, () => console.log('Listening to PORT'));