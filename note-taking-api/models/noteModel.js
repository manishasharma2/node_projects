const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
        title : {
            require: true,
            type : String,
        },
        content: {
            type : String,
            require : true,
        },
        userId: {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)
const Note = mongoose.model('Note',noteSchema)

module.exports = Note;  