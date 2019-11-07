const express = require('express');
const app = express();
const port = 3000;

const { makeUUID } = require('./bin/uuid.js');

app.get('/', (req,res) => {
	const getUUID = makeUUID();
	res.send(getUUID());
});

app.listen(port);

module.exports = app;