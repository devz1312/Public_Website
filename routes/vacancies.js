const express = require('express');
const router = express.Router();
const Vacancy = require('../models/vacancies'); // Import the Vacancy model

// Route to display all vacancies
router.get('/vacancies', async (req, res) => {
    try {
        // Fetch all vacancies from MongoDB
        const vacancies = await Vacancy.find();

        // Render the vacancies.ejs file and pass the vacancies data
        res.render('vacancies', { vacancies });
    } catch (error) {
        console.error('Error fetching vacancies:', error);
        res.status(500).send('Internal Server Error');
    }
});

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next(); // User is authenticated, proceed to the next middleware
    } else {
        res.redirect('/login'); // Redirect to login if not logged in
    }
}

// Protect the vacancies route
router.get('/vacancies', isAuthenticated, (req, res) => {
    // Fetch and display vacancies
});


module.exports = router;
