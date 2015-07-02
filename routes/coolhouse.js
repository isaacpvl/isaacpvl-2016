var express = require('express');
var router = express.Router();

/* GET subpage. */
router.get('/coolhouse', function(req, res, next) {
	res.render('coolhouse', {
		title: 'Isaac Paavola | Coolhouse',
		preload: true
	});
});

module.exports = router;