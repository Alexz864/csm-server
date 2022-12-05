require('dotenv').config();


require('mongoose').connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => console.log(err));