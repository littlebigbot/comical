require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path')
const authRoutes = require('./routes/auth');
const comicsRoutes = require('./routes/comics');
const Comic = require('./models').Comic;

const app = express()

const STATIC_PATH = path.resolve(__dirname, '../static');
const INDEX_HTML_PATH = path.resolve(STATIC_PATH, 'index.html');

if(process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.set('views', STATIC_PATH);
app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.set('view engine', 'ejs');

app.use(express.static(STATIC_PATH));
app.use(bodyParser.json())

app.options('/*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});

// Routes
app.use('/api/v2/auth', authRoutes)
app.use('/api/v2/comics', comicsRoutes)


// @TODO: find a better way
app.use([
  '/about',
  '/archive',
  '/admin/*'
  ], function(req, resp) {
  console.log(INDEX_HTML_PATH);
  resp.sendFile(INDEX_HTML_PATH);
});


app.get('/comic/:slug', function(req, res) {
  Comic
    .findOne({
      attributes: [ 'title', 'post', 'titleText', 'image', 'date' ],
      where: { slug: req.params.slug }
    })
    .then(comic => {
      res.render(INDEX_HTML_PATH, { title: comic.title, post: comic.post, titleText: comic.titleText, image: comic.image, date: comic.date });
    })
});

// Handle 404
app.use(function(req, res) {
  res.status(400);
  res.render(INDEX_HTML_PATH);
});

// Handle 500
app.use(function(error, req, res, next) {
  res.status(500);
  res.render(INDEX_HTML_PATH);
});

app.listen(1337, () => {
  console.log('Server running on http://localhost:1337')
})
