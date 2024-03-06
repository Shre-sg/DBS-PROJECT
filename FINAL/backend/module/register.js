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

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

router.post('/', async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ msg: error.details[0].message });
        }

        const email = req.body.email;
        const password = req.body.password;

        const [rows] = await db.promise().query('SELECT * FROM LOGIN WHERE EMAIL = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ msg: 'Email is already taken' });
        }

        const hash = await bcrypt.hash(password, 10);

        await db.promise().query('INSERT INTO LOGIN (EMAIL, PASSWORD) VALUES (?, ?)', [email, hash]);

        req.session.user = { email: email };
        req.session.isLoggedIn = true;

        res.cookie('sessionId', req.session.id, { httpOnly: true });

        res.status(201).json({ success: true, msg: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

module.exports = router;
