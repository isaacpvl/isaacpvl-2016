var express = require('express');
var router = express.Router();

/* GET homepage. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Isaac Paavola',
		preload: true,
		homepage: true
	});
});

module.exports = router;