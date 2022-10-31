const dotenv = require("dotenv")
const express = require("express")
const ejs = require("ejs")
const https = require("https")
const mongoose = require("mongoose")
const { Schema, model } = mongoose;
const bodyParser = require("body-parser")
const port = 8000
const app = express();

dotenv.config();

mongoose.connect(`mongodb+srv://waitlistDB:${process.env.DB_PASSWORD}@cluster0.htkdwba.mongodb.net/waitlistDB`)

const emailSchema = new Schema({
    email: String
});

const Email = model('Email', emailSchema);

app.set('view-engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.render('index.ejs')
})


app.post("/", (req, res) => {
    const email = req.body.email;

    var query = {email: email},
    update = { expire: new Date() },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    
    Email.findOneAndUpdate(query, update, options, function(error, result) {
        if (error) return;
    });

    if (res.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failed.html")
    }

})



app.listen(process.env.PORT || port, () => {
    console.log(`App is listening on port ${port}`);
})

