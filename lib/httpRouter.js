'use strict';
var fs = require('fs');
var http = require('http');
var action = require('./httpActions.js');
var util  	= require('./utils.js')
var httpRouter = exports = module.exports = {};

httpRouter.process= function(req,res){
	if(req.method == 'POST' || req.method == 'PUT' 
						   || req.method == 'GET'||req.method == 'PATCH' 
						   ||req.method == 'DELETE'){
		/*var url = {
			dir: req.url.split('/')[1],
			id: req.url.split('/')[2]
		}*/
		var url=[];
		url.dir = req.url.split('/')[1];
		url.id= req.url.split('/')[2];
		
		action[req.method](req,res,url);  // routers
	} 
	else
		util.createResponse(res,404,'Invalid ACTION METHOD');
}

