const cors = require('cors');
const express = require('express');
const server = express();
(server . use)((express . static)(__dirname));
(server . get)('/' , cors() , (request , response) => {
		(response . sendFile)(__dirname + '/index.html')});
(server . listen)(3000);

