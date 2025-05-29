const {model, Schema} = require("mongoose")
const { applyTimestamps } = require("./blog")

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    }
},
{
    timestamps : true
})

const Comment = model('Comment',commentSchema)

module.exports = Comment