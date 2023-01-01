const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("./models/blogpost");
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect("mongodb://localhost:27017/Blog-Posts");

const db = mongoose.connection; // shortcut variable
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const path = require("path");
//const router = require('../Development/Yelp-Camp/routes/users');

const app = express();

//set view engine to ejs and set path to ejs template directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//used for use of stylesheets - sets path to public folder and gives access to styles
app.use(express.static(__dirname + path.join("/public")));

// Middleware function to set the showLogin variable
const setShowLogin = (req, res, next) => {
  // Check the client's IP address and set a flag indicating whether the client's IP address is allowed to access the login option
  const allowedIps = process.env.ALLOWED_IPS.split(',');

  res.locals.showLogin = false;
  if (allowedIps.includes(req.ip)) {
    res.locals.showLogin = true;
  }

  next();
};

app.use(setShowLogin);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/blog", async (req, res) => {
  const blogpost = await BlogPost.find({});
  res.render("blog", { blogpost });
});

app.get("/blog/write", (req, res) => {
  res.render("write");
});

app.post("/blog/write");

app.get("/makeBlog", async (req, res) => {
  const post = new BlogPost({
    title: "Title",
    author: "author",
    content: "some content",
    date: 101622,
  });
  await post.save();
  res.send(post);
});

app.get("/aboutme", (req, res) => {
  res.render("aboutme");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
