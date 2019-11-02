/* Importing Different Modules */
const {globalVariables} = require('./config/configuration');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const {mongoDbUrl, PORT} = require('./config/configuration');
const flash = require('connect-flash');
//const {PORT} = require('./config/configuration');
const session = require('express-session');
const methodOverride = require('method-override');
const {selectOption} = require('./config/customFunctions');

const app = express();


// Configure Mongoose to Connect to MongoDB
mongoose.connect(mongoDbUrl, { useNewUrlParser: true })
    .then(response => {
        console.log("MongoDB Connected Successfully.");
    }).catch(err => {
        console.log("Database connection failed.");
});



/* Configure express*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

/* flash and session*/
app.use(session({
        secret: 'anysecret',
        saveUninitialized: true,
        resave: true,
}));

app.use(flash());
app.use(globalVariables);

/* Setup View Engine To Use Handlebars */
app.engine('handlebars', hbs({defaultLayout: 'default', helpers: {select: selectOption}}));
app.set('view engine' , 'handlebars');

/* method override middleware */
app.use(methodOverride('newMethod'));

/* Routes */
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
   console.log('Server is running on port '+PORT);
});