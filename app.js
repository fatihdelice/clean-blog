const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');

const app = express();

// connect DB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost/cleanblog-test-db');

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts: posts,
  });
});

app.get('/posts/:id', async (req, res) => {
  //console.log(req.params.id);
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post: post,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
