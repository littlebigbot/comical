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
const URL = 'http://waywardrobot.com';

if(process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.set('views', STATIC_PATH);
app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.set('view engine', 'ejs');

app.get('/comic/:slug', function(req, res) {
  console.log(req)
  Comic
    .findOne({
      attributes: [
        'title',
        'post',
        'image',
        'date',
        'thumbnail',
        'titleText'
      ],
      where: { slug: req.params.slug }
    })
    .then(comic => {
      res.render(INDEX_HTML_PATH, {
        subtitle: comic.title,
        description: comic.post,
        image: comic.image,
        titleText: comic.titleText,
        thumbnail: comic.thumbnail,
        date: comic.date,
        url: URL + req.path
      });
    })
});


// This needs to be above the `app.use(express.static(STATIC_PATH));` because lol
// @TODO: find a better way
app.get([
  '/',
  '/about',
  '/archive',
  '/admin/*'
  ], function(req, res) {
  res.render(INDEX_HTML_PATH, defaultMetaObject(req));
});

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

var defaultMetaObject = req => ({
  subtitle: 'Not all those who wander are lost. Though most are.',
  description: 'Wayward Robot is the story of CJ-32 as they journey, learning about the world and having people speak at him while he patiently listens and occasionally zones out',
  url: URL + req.path,
  image: '',
  thumbnail: '',
  titleText: '',
  date: new Date('November 01, 2018 03:24:00')
})

// Handle 404
app.get(function(req, res) {
  res.status(400);
  res.render(INDEX_HTML_PATH, defaultMetaObject(req));
});

// Handle 500
app.get(function(error, req, res, next) {
  res.status(500);
  res.render(INDEX_HTML_PATH, defaultMetaObject(req));
});

app.listen(1337, () => {
  console.log('Server running on http://localhost:1337')
})
