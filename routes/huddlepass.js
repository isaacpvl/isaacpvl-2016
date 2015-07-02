var express = require('express');
var router = express.Router();

/* GET subpage. */
router.get('/huddlepass', function(req, res, next) {
	res.render('huddlepass', {
		title: 'Isaac Paavola | HuddlePass',
		preload: true
	});
});

module.exports = router;