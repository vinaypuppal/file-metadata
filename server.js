var http = require('http');
var express = require('express');
var morgan = require('morgan');
var router = require('./router.js');
var path = require('path');

var app = express();
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname,'/public')));
router(app);

var server = http.createServer(app);

var port = process.env.PORT || 3000;

server.listen(port,function (error) {
	if (error) {throw error} else {console.log("server started on port: ",port);}
});
