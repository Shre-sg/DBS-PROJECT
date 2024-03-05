const express = require('express');
const session = require('express-session');
const router = express.Router();

router.use(session({
    secret: 'wasssssuppp',
    resave: false,
    saveUninitialized: false
}));

router.post('/', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ msg: 'Internal Server Error' });
            }
            res.clearCookie('sessionId');
            
            // Disable caching
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');

            res.json({ msg: 'Logout successful!' });
        });
    } else {
        res.json({ msg: 'No session to destroy!' });
    }
});




module.exports = router;
