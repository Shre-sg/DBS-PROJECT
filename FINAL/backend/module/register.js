const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('./db');
const Joi = require('joi');

const saltRounds = 10;

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const { error } = registerSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({ msg: error.details[0].message });
        }

        const [rows] = await db.promise().query('SELECT * FROM LOGIN WHERE EMAIL = ?', [email]);

        if (rows.length === 0) {
            const hash = await bcrypt.hash(password, saltRounds);

            await db.promise().query('INSERT INTO LOGIN (EMAIL, PASSWORD) VALUES (?, ?)', [email, hash]);

            ///this is for cookie
            const user = {
                email: req.body.email,
                // Other user data...
            };

            // Set session variable
            req.session.user = user;
            // Optionally, you can set a cookie to identify the session on the client side
            res.cookie('sessionId', req.session.id, { httpOnly: true });

            res.status(201).json({
                success: true, // Indicate registration success
                msg: 'User registered successfully!',
            });
        } 
        else {
            res.status(409).json({
                msg: 'Email is already taken!',
            });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

module.exports = router;
