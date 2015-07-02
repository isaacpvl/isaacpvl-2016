var express = require('express');
var router = express.Router();

/* GET subpage. */
router.get('/weirdshit', function(req, res, next) {
	res.render('weirdshit', {
		title: 'Isaac Paavola | Weird shit',
		preload: true
	});
});

module.exports = router;