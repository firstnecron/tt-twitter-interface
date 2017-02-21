'use strict';

const express = require('express');

const twitter = require('../twitter');
const router = express.Router();

router.get('/', (req, res) => {
	// Render template with the user's twitter info
	twitter.getData(data => {
		res.render('index', data);
	});
});

module.exports = router;
