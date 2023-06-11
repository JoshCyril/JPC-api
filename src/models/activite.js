const {
    Schema,
    model
} = require("mongoose");

const activiteSchema = new Schema({
    title: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    srcLink: {
        type: String,
    },
    status: {
        type: String,
    },
    statusUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

// create new collection
const Activite = new model("Activite", activiteSchema)

module.exports = Activite;