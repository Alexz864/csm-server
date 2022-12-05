// mongodb
require('./config/db');

const app = require('express')();
const port = process.env.PORT || 5000;

const AdminRouter = require('./api/Admin');

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


app.use('/admin', AdminRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})