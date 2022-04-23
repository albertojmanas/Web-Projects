//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Welcome to the Daily Scoop! A beautiful array of thoughts and life experiences that are related to me!";
const aboutContent = "Hello! My name is Alberto Manas a.k.a. AJ, please just call me that unless you are my supervisor. I am a musician/producer, dog-owner and writer. Within life I feel as though we never get much time to express ourselves and our stories, which is why I have created this website to compose my thoughts and ideas in a journal worthy of my own liking, as well as everyone who wants to read it!";
const contactContent = "I am always available to talk and converse about life. Perhaps even share stories instead of always having to write them down on this website! Lets connect!";


// Express app
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Connect to database
mongoose.connect("mongodb+srv://ajmanas7995:monkeyboy24@cluster0.ic918.mongodb.net/blogDB", {
  useNewUrlParser: true
});


// Create Scheme
const postsSchema = {
  title: String,
  content: String
};

// Passes singular version and schema to create Post
const Post = mongoose.model(
  "post", postsSchema
);

// Added find method to allow search through database
app.get("/", (req,res) => {
    Post.find({}, (err, foundPost) => {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: foundPost
      });
    });
});

app.get("/about", (req,res) => {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", (req,res) => {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", (req,res) => {
  res.render("compose");
});

app.post("/compose", (req,res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  // only save if no errors then redirect
  post.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});



//changed from postName to postId
app.get("/posts/:postId", (req,res) =>{
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, (err, post) => {
        // IF FOUND render the post page with the title and content
      res.render("post", {
        title: post.title,
        content: post.content
      });
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
