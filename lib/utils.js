'use strict';

var utils = module.exports= exports = {};

utils.getFilename 		= function(dir,fileId){
							return ("./" + dir + "/file_" + fileId + ".json"); 
						}


utils.createResponse 	= function(res,msg_code,msg_type,msg ){
							res.writeHead(msg_code,{'Content-Type':'text/plain'});
							res.write(msg); 
							res.end();
						}

utils.patchJsonObjs 	= function(jsonObjSource, jsonObjDestination){
							for(var key in jsonObjSource){
									if(key != 'id')										
										jsonObjDestination[key] = jsonObjSource[key];
							}
							return jsonObjDestination;	

						}