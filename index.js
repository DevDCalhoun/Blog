const express = require('express');
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

app.get('/aboutme', (req, res) => {
    res.render('aboutme');
})

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});