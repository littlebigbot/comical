const express = require('express');
const upload = require('../services/upload');
const router = express.Router();
const models = require('../models');
const validateToken = require('../utils').validateToken;

// Sequelize stuff
const Comic = models.Comic;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = models.sequelize;

router.post('/', upload, validateToken, (req, res) => {

  Comic
    .create({
      title: req.body.title,
      post: req.body.post,
      slug: req.body.slug,
      image: req.file.location,
      titleText: req.body.titleText,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false
    })
    .then(comic => {
      res.send(JSON.stringify({status: 200, error: null, response: comic}));
    })
})

router.get('/last', (req, res) => {
  Comic
    .findOne({
      attributes: ['title', 'post', 'titleText', 'image', 'slug', 'date'],
      order: [ ['date', 'DESC'] ],
      where: { deleted: false }
    })
    .then(comic => {
      res.send(JSON.stringify({status: 200, error: null, response: comic}));
    })
})

router.get('/:slug', (req, res) => {
  Comic
    .findOne({
      attributes: ['title', 'post', 'titleText', 'image', 'slug', 'date'],
      where: { slug: req.params.slug }
    })
    .then(comic => {
      res.send(JSON.stringify({status: 200, error: null, response: comic}));
    })
})

router.post('/:slug', upload, validateToken, (req, res, next) => {

  const fields = ['title','post','slug','titleText','date'];
  let updateObject = {updatedAt: new Date()}

  if(req.file) {
    updateObject.image = req.file.location
  }
  updateObject = fields.reduce((r, field) => {
    if(req.body[field]) {
      r[field] = req.body[field];
    }
    return r;
  }, updateObject)

  console.log(updateObject);

  Comic
    .update(
      updateObject,
      { where: {slug: req.params.slug} }
    )
    .then(() => {
      res.send(JSON.stringify({status: 200, error: null, response: 'OK'}));
      // res.sendStatus(200);
    })
    .catch(next)
})

router.delete('/:slug', validateToken, (req, res) => {
  Comic
    .update(
      {deleted: true},
      {where: {slug: req.params.slug}}
    )
    .then(rowsUpdated => {
      res.json(rowsUpdated);
    })
    .catch(next) 
})

router.get('/:slug/navigation', (req, res) => {
  Comic
    .findOne({
      attributes: ['date'],
      where: { slug: req.params.slug }
    })
    .then(comic => {
      const first = models.Comic
        .findOne({
          attributes: ['slug'],
          order: [ ['date', 'ASC'] ],
          where: { deleted: false }
        });
      const previous = models.Comic
        .findOne({
          attributes: ['slug'],
          where: { date: { [Op.lt]: comic.date }, deleted: false },
          order: [ ['date', 'DESC'] ]
        });
      const next = models.Comic
        .findOne({
          attributes: ['slug'],
          where: { date: { [Op.gt]: comic.date }, deleted: false },
          order: [ ['date', 'ASC'] ]
        });
      const last = models.Comic
        .findOne({
          attributes: ['slug'],
          order: [ ['date', 'DESC'] ],
          where: { deleted: false }
        });
      const random = models.Comic
        .findOne({
          attributes: ['slug'],
          where: { slug: { [Op.ne]: req.params.slug }, deleted: false },
          order: sequelize.random()
        });

      let responseObject = {
        firstSlug: null,
        previousSlug: null,
        currentSlug: req.params.slug,
        nextSlug: null,
        lastSlug: null,
        randomSlug: null
      }

      Promise
        .all([first, previous, next, last, random])
        .then(responses => {
          var response = responses.map((r, i) => {
            switch(i) {
              case 0:
                responseObject.firstSlug = r && r.slug;
                break;
              case 1:
                responseObject.previousSlug = r && r.slug;
                break;
              case 2:
                responseObject.nextSlug = r && r.slug;
                break;
              case 3:
                responseObject.lastSlug = r && r.slug;
                break;
              case 4:
                responseObject.randomSlug = r && r.slug;
                break;
              default:
                break;
            }
          });
          res.send(JSON.stringify({status: 200, error: null, response: responseObject}));
        })
        .catch(err => {
          res.send(JSON.stringify({status: 500, error: err, response: null}));
        })

    })
})


router.get('/', (req, res) => {
  Comic
    .findAll({
      attributes: ['title', 'post', 'titleText', 'image', 'slug', 'date']
    })
    .then(comics => {
      res.send(JSON.stringify({status: 200, error: null, response: comics}));
    })
})


module.exports = router;
