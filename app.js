const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override');
const path = require('path');
const Post = require('./models/Post');
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageControllers');

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
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.getCreatePost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPostPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
