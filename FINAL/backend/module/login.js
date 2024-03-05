const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const router = express.Router();
const db = require('./db');
const Joi = require('joi');

router.use(session({
    secret: 'wasssssuppp',
    resave: false,
    saveUninitialized: false
}));

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

router.post('/', async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ msg: error.details[0].message });
        }

        const email = req.body.email;
        const password = req.body.password;

        const [rows] = await db.promise().query('SELECT * FROM LOGIN WHERE EMAIL = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const hashedPassword = rows[0].PASSWORD;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Incorrect email or password' });
        }

        req.session.user = { email: email };
        req.session.isLoggedIn = true;

        res.cookie('sessionId', req.session.id, { httpOnly: true });

        res.json({ msg: 'Login successful!' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

module.exports = router;
