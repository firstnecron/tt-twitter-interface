'use strict';

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	// Render template with the user's twitter info
	res.send('index');
});

module.exports = router;
