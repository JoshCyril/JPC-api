const mongoose = require("mongoose");
// const dotenv = require('dotenv')
require('dotenv').config()

mongoose.connect("mongodb+srv://db-api:" + process.env.UID_PASS + "@cluster0.a7wx0ee.mongodb.net/db?retryWrites=true&w=majority", {
    //     useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected | db")
}).catch((e) => {
    console.log("Not connected: " + e)
})