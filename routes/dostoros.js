var express = require('express');
var router = express.Router();

/* GET subpage. */
router.get('/dostoros', function(req, res, next) {
	res.render('dostoros', {
		title: 'Isaac Paavola | Dos Toros',
		preload: true
	});
});

module.exports = router;