var express = require('express');
var router = express.Router();

/* GET subpage. */
router.get('/overdog', function(req, res, next) {
	res.render('overdog', {
		title: 'Isaac Paavola | OverDog',
		preload: true
	});
});

module.exports = router;