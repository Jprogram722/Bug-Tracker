// This will be the server side code for the back end server

require('dotenv').config({path: __dirname+'\\.env'});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


// Sets it so that mongoose will send anything even not specified in schema
mongoose.set('strictQuery', false);
const dbURI = process.env.DB_URI;

// init express app
const app = express();

// parses incoming requests with JSON
app.use(bodyParser.json());

// connects the backend to the front end
app.use(cors());

// parses urlencoded payloads
app.use(express.urlencoded({extended: true}));

// Setting up access to api to handle users
const users = require('./routes/api/users');
app.use('/api/users', users);

// Setting up access to api to handle bug reporting
const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

// Set the port
const port = process.env.PORT || 3000;

async function start() {
    try{
        await mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
        app.listen(port, () => {
            console.log(`Connected and listening on port ${port}`);
        });
    }
    catch(err){
        console.log(err.message);
    }
};

start();

