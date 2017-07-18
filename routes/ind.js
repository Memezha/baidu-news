var express = require('express');
var router = express.Router();

var con = require('../model/connect');


/* GET index page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


module.exports = router;