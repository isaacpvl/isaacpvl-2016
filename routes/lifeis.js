var express = require('express');
var router = express.Router();

/* GET subpage. */
router.get('/lifeis', function(req, res, next) {
	res.render('lifeis', {
		title: 'Isaac Paavola | Life.is',
		preload: true
	});
});

module.exports = router;