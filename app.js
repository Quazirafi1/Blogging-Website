const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const path = require('path'); 
const app = express();

//Configure mongoose to connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true })
	.then(response => {
		console.log("MongoDB connected seccessfully");
	}).catch(err => {
		console.log("DB connection failed.");
	})

//configure express
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true})); 	
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', (req, res) => {
	res.send("Welcome to the blog!");
});



//server listens at port 3000, server start-up
app.listen(3000, () => {
	console.log('server started at 3000...');
});