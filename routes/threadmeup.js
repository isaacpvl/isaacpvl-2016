var express = require('express');
var router = express.Router();

/* GET subpage. */
router.get('/threadmeup', function(req, res, next) {
	res.render('threadmeup', {
		title: 'Isaac Paavola | ThreadMeUp',
		preload: true
	});
});

module.exports = router;
