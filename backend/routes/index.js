/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});

module.exports = router;
