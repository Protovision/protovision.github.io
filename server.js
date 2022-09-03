const cors = require('cors');
const express = require('express');
const server = express();
(server . use)((express . static)('public'));
(server . get)('/' , cors() , (request , response) => {
		(response . sendFile)(__dirname + '/public/index.html')});
(server . listen)(3000);

