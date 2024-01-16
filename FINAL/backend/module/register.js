const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('./db');

const saltRounds = 10;

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const [rows] = await db.promise().query('SELECT * FROM LOGIN WHERE EMAIL = ?', [email]);

        if (rows.length === 0) {
            const hash = await bcrypt.hash(password, saltRounds);

            await db.promise().query('INSERT INTO LOGIN (EMAIL, PASSWORD) VALUES (?, ?)', [email, hash]);

            res.status(201).json({
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
