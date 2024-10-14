const mongoose = require('mongoose');

// Define the schema for vacancies
const vacancySchema = new mongoose.Schema({
    companyName: String,
    department: String,
    position: String,
    dateOfPosting: Date,
    jobLink: String
});

// Create and export the Vacancy model
const Vacancy = mongoose.model('Vacancy', vacancySchema);

module.exports = Vacancy;
