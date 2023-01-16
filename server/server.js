// mongodb
require('./config/db');

// express
const express = require('express');

// match model
const MatchModel = require('./models/Match');

const app = require('express')();
const port = process.env.PORT || 5000;

const AdminRouter = require('./api/Admin');

app.use(express.json());

// cors
const cors = require('cors');
app.use(cors());

// For accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());


// test server
app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING!");
});

// match test
app.post('/insert', async(req, res) => {
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    const data = req.body.data;
    const scor = req.body.scor;
    const match = new MatchModel({team1: team1, team2: team2, data: data, scor: scor});

    try {
        await match.save();
        res.send("Inserted data.");
    } catch(err) {
        console.log(err);
    }
});

// read match
app.get('/read', async(req, res) => {
    MatchModel.find({}, (err, result) => {
        if(err) {
            res.send(err)
        }

        res.send(result);
    })
});

// login
app.use('/admin', AdminRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})