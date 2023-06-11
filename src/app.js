const express = require("express")
const app = express()
const cors = require('cors');

require("./db/conn")

const port = process.env.PORT || 3000

app.use(cors());
app.use(express.static('public'));

app.use(express.json());

app.use('/api', require('./middleware/api'));

app.listen(port, () => {
    console.log(`Connected to port: ${port}`)
});

app.get("/", (req, res) => {
    res.send("Welcome to JPC API");
})