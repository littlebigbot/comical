const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()
const models = require('./models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config/config.json');
const cors = require('cors');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = models.sequelize;

const comicsRoutes = require('./routes/comics');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

app.use(cors());

app.use(express.static('public'))
app.use(bodyParser.json())

app.options('/*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});

app.post('/api/v2/auth/signUp', (req, res) => {
  models.User
    .findAll({
      where: { username: req.body.username }
    })
    .then((users) => {
      if(users.length === 0) {
        models.User
          .create({
            // @TODO async this
            password: bcrypt.hashSync(req.body.password, salt),
            username: req.body.username,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .then(() => res.sendStatus(200))
          .catch(() => res.sendStatus(500));
      }
    })
    .catch(() => res.sendStatus(500));
})

app.post('/api/v2/auth/login', (req, res) => {
  return models.User
    .findOne({
      where: { username: req.body.username }
    })
    .then(user => {
      // @TODO async this
      if(bcrypt.compareSync(req.body.password, user.password)) {

        const payload = { username: user.username };
        const options = { expiresIn: '2d', issuer: 'http://waywardrobot.com' };
        const secret = config[process.env.NODE_ENV].secret;
        const token = jwt.sign(payload, secret, options);
        console.log(token);
        const response = {success: true, token: token, status: 200, result: user.username}

        console.log(response);
        return res.send(response);
      }
      return res.sendStatus(401);
    })
    .catch(() => res.sendStatus(401));
})

app.use('/api/v2/comics', comicsRoutes)


app.listen(1337, () => {
  console.log('Server running on http://localhost:1337')
})
