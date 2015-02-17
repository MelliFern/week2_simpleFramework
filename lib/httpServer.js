
'use strict';
var router 	= require('./httpRouter.js');
var fs 		= require('fs');
var http 	= require('http');
var server 	= exports = module.exports = {};

server.addResource = function(resource){
					fs.mkdir('./'+resource, function(err){
						if (err && err.code !==('EEXIST'))throw err; 				
					});
				}


server.startServer =  function(port){
					http.createServer(function(req,res){
						router.process(req,res); // callback for error handling
					}).listen(port, function(){
						console.log('server listening at port ' + port);
					});
				}


