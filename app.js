// app.js
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo')

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(
  session({
    secret: 'katnip', // Use a strong, secret key
    resave: false, // Avoid resaving session if it wasn't modified
    saveUninitialized: false, // Don't save uninitialized sessions
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/ca_industrial_training', // MongoDB connection URL
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000*60*60, // 1 week cookie expiration
      httpOnly: true, // Helps prevent XSS attacks
      secure: false, // Set to true if using HTTPS
    }
  })
);


// Homepage route
app.get('/', (req, res) => {
    res.render('home',{session:req.session});
});



// Other routes
const authRoutes = require('./routes/auth');
const vacanciesRoute = require('./routes/vacancies');

app.use(authRoutes);
app.use('/',vacanciesRoute);

mongoose.connect('mongodb://localhost:27017/ca_industrial_training', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



// Server listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
