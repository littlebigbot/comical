const express = require('express');
const router = express.Router();
const User = require('../models').User;
const validateToken = require('../middleware/validate-token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// router.post('/signUp', (req, res) => {
//   models.User
//     .findAll({
//       where: { username: req.body.username }
//     })
//     .then((users) => {
//       if(users.length === 0) {
//         models.User
//           .create({
//             // @TODO async this
//             password: bcrypt.hashSync(req.body.password, salt),
//             username: req.body.username,
//             createdAt: new Date(),
//             updatedAt: new Date()
//           })
//           .then(() => res.sendStatus(200))
//           .catch(() => res.sendStatus(500));
//       }
//     })
//     .catch(() => res.sendStatus(500));
// })

router.post('/login', (req, res) => {
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


module.exports = router;
