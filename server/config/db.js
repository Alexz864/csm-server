require('dotenv').config();
const moongoose = require('mongoose');

moongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => console.log(err));