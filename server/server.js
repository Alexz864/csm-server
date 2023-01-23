// mongodb connect
require('./config/db');

// port
const port = process.env.PORT || 5000;

// express
const express = require('express');
const app = require('express')();
app.use(express.json());

// routers
const AdminRouter = require('./api/Admin');
const MatchRouter = require('./api/Match');
const PlayerRouter = require('./api/Player');

// cors
const cors = require('cors');
app.use(cors());

// for accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

// server response
app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING!");
});

// login
app.use('/admin', AdminRouter);

// match CRUD
app.use('/match', MatchRouter);

// upload image
app.use('/player', PlayerRouter);

// server listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});