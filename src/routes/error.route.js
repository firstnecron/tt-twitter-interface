'use strict';

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	// Render a friendly errorRoute page when something goes wrong
	res.send('error');
});

module.exports = router;
