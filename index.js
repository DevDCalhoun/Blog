const express = require('express');
const mongoose = require('mongoose');
const BlogPost = require('./models/blogpost');

mongoose.connect('mongodb://localhost:27017/Blog-Posts');

const db = mongoose.connection; // shortcut variable
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const path = require('path');

const app = express();

//set view engine to ejs and set path to ejs template directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//used for use of stylesheets - sets path to public folder and gives access to styles
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/blog', (req, res) => {
    res.render('blog');
})

app.get('/makeBlog', async (req, res) => {
    const post = new BlogPost({title: "Title", author: "author", content: "some content", date: 101622});
    await post.save();
    res.send(post);
})

app.get('/aboutme', (req, res) => {
    res.render('aboutme');
})

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});