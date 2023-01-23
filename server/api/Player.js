// express
const express = require('express');
const router = express.Router();

// mongodb player schema
const Player = require('../schemas/PlayerSchema');

// multer
const multer = require('multer');

// filesystem
const fs = require('fs');

// storage
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'playerImage')
    },
    filename:(req, file, cb) => {
        cb(null, file.originalname);
    },
});

// upload
const upload = multer({
    storage: Storage
});

router.post('/upload', upload.single('image'), (req, res) => {
    const savePlayer = new Player({
        name: req.body.name,
        lastName: req.body.lastName,
        image: {
            data: fs.readFileSync('playerImage/' + req.file.filename),
            contentType: 'image/png'
        }
    });
    savePlayer.save()
    .then(() => res.send("Successfully uploaded."))
    .catch((err) => console.log(err));
});

// read
router.get('/upload', async(req, res) => {
    const allData = await Player.find()
    res.json(allData)
})

module.exports = router;