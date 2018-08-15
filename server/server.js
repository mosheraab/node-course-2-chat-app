const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
var app = express();

// set express to listen on 3000 with static content

app.use(express.static(publicPath));
app.listen(port, () => {
	console.log("Server started on port", port);
});