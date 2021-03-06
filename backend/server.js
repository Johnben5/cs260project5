const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
mongoose.connect('mongodb://localhost:27017/yardsale', {
    useNewUrlParser: true
});
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

const items = require("./items.js");
app.use("/api/items", items.routes);

app.listen(3003, () => console.log('Server listening on port 3003!'));