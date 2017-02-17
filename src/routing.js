'use strict';

const express = require('express');

const app = express();
// Routers
const homeRoute = require('./routes/index.route');
const errorRoute = require('./routes/error.route');

app.use('/static', express.static('./public'));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/', homeRoute);
app.use('/error', errorRoute);

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Front-end server is now listening on port', listener.address().port);
});
