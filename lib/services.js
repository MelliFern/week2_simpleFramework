'use strict';

var fs = require('fs');
var services = module.exports = exports ={};

services.msg = {error :"Error", invalid:"Invalid request", success:"successful"}

services.createFile = function(filename,callback){
						fs.exists(filename, function(exists){
							if (exists)  callback('Error',filename + ' File already exists');
							else{
								fs.writeFile(filename,'',function(err){
										if(err) callback(err, services.msg.error);
										else
										  callback(null, services.msg.success);
									});
								}
						});


}

services.writeFile = function(filename,jsonData,callback){
						fs.exists(filename, function(exists){
							if (!exists)  callback('Error',filename + 'File does not exists');
							else{
								fs.writeFile(filename, JSON.stringify(jsonData),function(err){
										if(err) callback(err, services.msg.error);
										else
										  callback(null, services.msg.success);
									});
								}
						});
					}


services.readFile = function(filename,callback){
					fs.exists(filename, function(exists){
					if (!exists)  
						callback ('Error','', filename + 'File does not exists');
					else{
						fs.readFile(filename,'utf8', function(err,data){
							if (err) throw callback(err,'', services.msg.error);
							else {
									var fileObj = JSON.parse(data);
										  callback(null, fileObj, services.msg.success);
								  }
							});
						}
					});
				}
					
services.deleteFile = function(filename, callback){
					fs.exists(filename, function(exists){
						if (!exists)  
						callback ('Error',null, filename + 'File does not exists');
						else{
								fs.unlink(filename, function(err){
									if (err) callback(err, services.msg.error);
									else callback('',services.msg.success);
								});
							}
					});
				}

services.getInputData = function(req,res, callback){
						var input = ''; 
						req.on('data',function(data){ input += data.toString('utf-8');}); 
						req.on('end',function(){
							callback(JSON.parse(input));
						});

				}