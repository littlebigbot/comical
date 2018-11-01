var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM comics', function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

router.get('/:slug', function(req, res, next) {
  connection.query('SELECT * FROM comics WHERE slug = "' + req.params.slug + '" LIMIT 1', function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      //If there is no error, all is good and response is 200OK.
    }
  });
});

router.get('/:slug/navigation', function(req, res, next) {
  console.log(req.params.slug);

  var currentQuery = 'SELECT date FROM comics WHERE slug ="'+req.params.slug+'"';
  var previousQuery = 'SELECT slug FROM comics WHERE date < ('+currentQuery+') order by date desc limit 1;';
  var nextQuery = 'SELECT slug FROM comics WHERE date > ('+currentQuery+') order by date desc limit 1;';
  var randomQuery = 'SELECT slug FROM comics WHERE slug <> "'+req.params.slug+'" ORDER BY RAND() LIMIT 1;';

  console.log([previousQuery, nextQuery, randomQuery].join(' '));

  var responseObject = {
    previousSlug: null,
    nextSlug: null,
    randomSlug: null
  }

  connection.query([previousQuery, nextQuery, randomQuery].join(' '), ['previousSlug', 'nextSlug', 'randomSlug'])
    .on('result', function(row, index) {
      switch(index) {
        case 0:
          responseObject.previousSlug = row.slug;
          break;
        case 1:
          responseObject.nextSlug = row.slug;
          break;
        case 2:
          responseObject.randomSlug = row.slug;
          break;
        default:
          break;
      }
    })
    .on('end', function() {
      res.send(JSON.stringify({"status": 200, "error": null, "response": responseObject}));
    });
});

module.exports = router;
