const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const authRoutes = require('./routes/auth');
const comicsRoutes = require('./routes/comics');

const app = express()

app.use(cors());

app.use(express.static('public'))
app.use(bodyParser.json())

app.options('/*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});

app.post('/api/v2/auth', authRoutes)
app.use('/api/v2/comics', comicsRoutes)


app.listen(1337, () => {
  console.log('Server running on http://localhost:1337')
})
