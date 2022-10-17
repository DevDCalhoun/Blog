const mongoose = require('mongoose');
const posts = require('./posts');
const BlogPost = require('../models/blogpost');

mongoose.connect('mongodb://localhost:27017/Blog-Posts');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
})

const seedDB = async () => {
    await BlogPost.deleteMany({});
    for(let i = 0; i < 50; i++) {
       const newPost = new BlogPost({
        title: `${posts[0].title}`,
        author: `${posts[0].author}`,
        content: `${posts[0].content}`,
        date: Math.floor(Math.random() * 1000)
       })
       await newPost.save();
    }
}

seedDB();