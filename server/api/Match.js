// express
const express = require('express');
const router = express.Router();

// mongodb match schema
const Match = require('../schemas/MatchSchema');


// add match
router.post('/insert', async(req, res) => {
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    const data = req.body.data;
    const scor = req.body.scor;
    const match = new Match({team1: team1, team2: team2, data: data, scor: scor});

    try {
        await match.save();
        res.send("Inserted data.");
    } catch(err) {
        console.log(err);
    }
});

// read match
router.get('/read', async(req, res) => {
    Match.find({}, (err, result) => {
        if(err) {
            res.send(err)
        }

        res.send(result)
    })
});

// delete match
router.delete("/delete/:id", async(req, res) => {
    const id = req.params.id;
    
    await Match.findByIdAndRemove(id).exec()
    res.send('deleted');
});

module.exports = router;