const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// Sign-up route
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    console.log(req.body);
    const { firstName, lastName,email, password,articleshipFirm, caFinalAttempt } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        articleshipFirm,
        caFinalAttempt
    });
    await newUser.save();
    res.redirect('/login');
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { email, password,rememberMe } = req.body;
    const user = await User.findOne({ email });
    
    if (user && await bcrypt.compare(password, user.password)) {
        return res.redirect('/vacancies');
    } else {
        res.send('Login failed. Invalid credentials.');
    }

    req.session.userId = user._id;

    if(rememberMe){

        req.session.cookie.maxAge=1000*60*60;
    }else{
        req.session.cookie.expires=false;
    }

    return res.redirect('/vacancies');
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/vacancies'); // Handle error
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        return res.redirect('/login'); // Redirect to homepage after logout
    });
  });
  

module.exports = router;
