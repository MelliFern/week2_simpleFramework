var chai = require('chai');
var chaihttp = require('chai-http')
;var fs = require('fs');

var services = require('../lib/services.js');

chai.use(chaihttp);
var expect = chai.expect; 
var fullFileName = './Files/file_1.json';
var fulldir = './Files/';

describe('Test - services', function(){

		before(function(){
			fs.mkdir('./Files', function(err){
						if (err && err.code !==('EEXIST'))throw err; 				
					});
			fs.writeFile(fulldir+'file_4.json','',function(err){
					if(err) throw err;
				});
			

		});

//------------------------------------------------------------------
		describe('Test - services.js', function(done){
			before(function(){
				fs.unlink (fullFileName, function(err){
					if (err) console.log();
				});
			});

		    it('Function- createFile \ninput : (./Files/file_1, callback)', function(done){
		    	
			    	services.createFile(fullFileName, function(err, status){
			    		expect(status).to.eql('successful');
			    		expect(err).to.be.null; // jshint ignore:line
			    		done();
			    		});
		    });
		});

		describe('Test - services.js', function(done){
			before(function(){
				fs.writeFile(fullFileName,'',function(err){
					if(err) throw err;
				});
			});


		    it('Function- createFile file exists msg test \n'+
		    		'input : (./Files/file_1, callback)', function(){
	    		services.createFile(fullFileName, function(err, status){
	    		expect(status).to.eql(fullFileName +' File already exists');
	    		//done();
	    		
	    		});
		     });
		});		

//------------------------------------------------------------------


		describe('Test - services.js', function(){


		    it('Function- writeFile \n write file and read it back', function(done){
		    	
			    	services.writeFile(fullFileName,
			    			{"id":"1", "fname":"JANE", "lname":"DOE"} ,function(err, status){
						    		expect(status).to.eql('successful');
						    		fs.readFile(fullFileName,'utf8', function(err,data){
									if (err) throw err; 
									else {
											expect(JSON.parse(data)).to.eql
													({"id":"1", "fname":"JANE", "lname":"DOE"});
											done();	  
										  }
									});		
					});
		    });
		});


		describe('Test - services.js', function(done){
			
			it('Function- writeFile \n write file and read it back', function(done){
		    	
			    	services.writeFile(fulldir+'file_2',
			    			{"id":"1", "fname":"JANE", "lname":"DOE"} ,function(err, status){
						    		expect(err).to.eql('Error');
						    		expect(status).to.eql(fulldir+'file_2' + 'File does not exists');
						    		
					done();
					});
		    });


		});
//------------------------------------------------------------------

	
		describe('Test - services.js', function(done){
			var input = {"id":"1", "fname":"JOHN", "lname":"DOE"};
			before(function(){
				fs.writeFile(fulldir+'file_3.json', JSON.stringify(input),function(err){
					if(err) throw err;
				});
			});


		    it('Function- readFile \n'+
		    		'input : (./Files/file_3, callback)', function(done){
	    		services.readFile(fulldir+'file_3.json', function(err,data,status){
	    			if(data)
	    				expect(data).to.eql(input);
	    		done();
	    		
	    		});
		     });
		});		


//------------------------------------------------------------------

describe('Test - services.js', function(done){
			it('Function- deleteFile \ninput : (./Files/file_4, callback)', function(done){
		    	
			    	services.deleteFile(fulldir+'file_4.json', function(err, status){
			    		expect(status).to.eql('successful');
			    		
			    		done();
			    		});
		    });
		});

});