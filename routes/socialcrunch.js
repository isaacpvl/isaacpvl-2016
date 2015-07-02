var express = require('express');
var router = express.Router();

/* GET subpage. */
router.get('/socialcrunch', function(req, res, next) {
	res.render('socialcrunch', {
		title: 'Isaac Paavola | SocialCrunch',
		preload: true
	});
});

module.exports = router;