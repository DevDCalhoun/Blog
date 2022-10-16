const mongoose = require('mongoose');
const Schema = mongoose.Schema; // shortcut variable

const BlogPostSchema = new Schema({
    title: String,
    author: String,
    content: String,
    date: Number,
})

module.exports = mongoose.model('BlogPost', BlogPostSchema);