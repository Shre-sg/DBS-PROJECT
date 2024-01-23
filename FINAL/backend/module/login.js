const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('./db');
const Joi = require('joi');


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const { error } = loginSchema.validate(req.body);

    db.query('SELECT * FROM LOGIN WHERE EMAIL = ?', [email], (err, result) => {
        if (error) {
            return res.status(400).json({ msg: error.details[0].message });
        }

        if (result.length > 0) {
            const hashedPassword = result[0].PASSWORD;

            bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ msg: err });
                }

                if (isMatch) {


                    const user = {
                        email: req.body.email,
                        // Other user data...
                    };
                
                    // Set session variable
                    req.session.user = user;
                    res.cookie('sessionId', req.session.id, { httpOnly: true });

                    return res.json({
                        msg: 'Login successful!',
                    });
                } 
                else {
                    return res.status(401).json({
                        msg: 'Incorrect email or password',
                    });
                }
            });
        } else {
            return res.status(404).json({ msg: 'User not found' });
        }
    });
});

module.exports = router;
