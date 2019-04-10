const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title : {
        type : String,
        required : [true, 'Title cannot be empty']
    },
    content : {
        type : String,
        required : [true, 'Content cannot be empty']
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
})


const Article = mongoose.model('Article', articleSchema)
module.exports = Article