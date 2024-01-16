const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('./db');

router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM LOGIN WHERE EMAIL = ?', [email], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: err });
        }

        if (result.length > 0) {
            const hashedPassword = result[0].PASSWORD;

            bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({ msg: err });
                }

                if (isMatch) {
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
            return res.status(401).json({ msg: 'Unregistered user!' });
        }
    });
});

module.exports = router;
