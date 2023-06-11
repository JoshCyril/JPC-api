const {
    Schema,
    model
} = require("mongoose");

const projectSchema = new Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    imgUrl: {
        type: String,
    },
    srcLink: {
        type: String,
    },
    docLink: {
        type: String,
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
})

// create new collection
const Project = new model("Project", projectSchema)

module.exports = Project;