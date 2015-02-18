'use strict';

var fs 			= require ('fs');
var utils 		= require('./utils.js');
var services    = require('./services.js');
var action 		= exports = module.exports = {}; // jshint ignore:line
var plainMsgTyp = "{\'Content-Type\':\'text/plain\'}";

action.POST=function (req,res,url){

	services.getInputData(req, res, function(inputJsonData){
			var filename = utils.getFilename(url.dir,inputJsonData.id);
		services.createFile(filename, function(err,status){
			if(err && status != (filename + ' File already exists'))
				utils.createResponse(res,400,plainMsgTyp,status); 
			else{
					services.writeFile(filename, inputJsonData,function(err,status){
								if(err) 
									utils.createResponse(res,400,plainMsgTyp,status);
								else
									utils.createResponse(res,200,plainMsgTyp,status);
							}); 
				}
			});
	});
};


action.PUT=function(req,res,url){
	services.getInputData(req, res, function(inputJsonData){
			var filename = utils.getFilename(url.dir,url.id);
			services.writeFile(filename, inputJsonData,function(err,status){
				if(err) 
					utils.createResponse(res,400,plainMsgTyp,status);
				else
					utils.createResponse(res,200,plainMsgTyp,status);

			}); 
		});
	};

action.PATCH = function(req,res,url){
	services.getInputData(req, res, function(inputJsonData){
		var filename = utils.getFilename(url.dir,url.id);
		services.readFile(filename,function(err,data,status){
				if(err)
					utils.createResponse(res,400,plainMsgTyp,status);
				else{
					var fileObj = utils.patchJsonObjs(inputJsonData,data);
					services.writeFile(filename, fileObj,function(err,status){
						if(err) 
							utils.createResponse(res,400,plainMsgTyp,status);
						else
							utils.createResponse(res,200,plainMsgTyp,status);

			});
				}
			});
		});
	};


	action.GET = function(req,res,url){				
				var filename = utils.getFilename(url.dir,url.id);
				services.readFile(filename,function(err,data,status){
						if(err)
							utils.createResponse(res,400,plainMsgTyp,status);
						else	
							utils.createResponse(res,200,plainMsgTyp,JSON.stringify(data));

				});
			};
		
	action.DELETE = function(req,res,url){				
			var filename = utils.getFilename(url.dir,url.id);
			services.deleteFile (filename,function(err,status){
					if(err)
						utils.createResponse(res,400,plainMsgTyp,status);
					else	
						utils.createResponse(res,200,plainMsgTyp,status);

			});
		};