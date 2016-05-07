var express = require('express');
var router = express.Router();

/* GET subpage. */
router.get('/recent', function(req, res, next) {
	res.render('recent', {
		title: 'Isaac Paavola | Recent work',
		preload: true
	});
});

module.exports = router;