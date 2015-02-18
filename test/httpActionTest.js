'use strict';

var chai 	= require('chai');
var chaihttp= require('chai-http');
var fs 		= require('fs');
var server 	= require('../lib/httpServer.js');
var action 	= require('../lib/httpActions.js');
chai.use(chaihttp);
var expect 	= chai.expect; 
var port 	= 3000;	

describe('Test - httpActions.js', function(){
	before(function(){
				server.addResource('school'); 
				server.startServer(port);
			});

	
	describe('POST Test1', function(){
		it('Test id', function(done){
			chai.request('localhost:'+port)
			.post('/school')
			.send({id:"student", name:"JANE DOE"})
			.end(function(err,res){
			expect(err).to.eql(null);
			fs.exists('./school/file_student.json', function (exists){
				expect(exists).to.be.true; // jshint ignore:line
				done();
				});
			});
		});
	});

describe('POST Test2 ', function(done){
	
	it('POST - creates new file and writes post data ', function(done){
		chai.request('localhost:3000')
		.post('/school')
		.send({id:'student', name:'JANE DOE'})
		.end(function(err,res){
		expect(err).to.eql(null);
		fs.readFile('./school/file_student.json','utf8', function(err,data){
			if (err) throw "GET - error   -> "+ err; 
			else {
				var fileObj = JSON.parse(data);	
				expect(fileObj).to.eql({id:'student',name:'JANE DOE'});
				done();
				}

		});
		
		});
	});
});
	
describe('PUT Test ', function(done){
	before(function(){

		chai.request('localhost:3000')
		.post('/school')
		.send({id:"student1", name:"BILL", lname:"HILL"})
		.end(function(err,res){ 
			if (err) console.log(err);
			});	
	});


	it('PUT - writes to file', function(done){
		chai.request('localhost:3000')
		.put('/school/student1')
		.send({id:"student1", fname:"BILLY", lname:"HILL", class:"HIST"})
		.end(function(err,res){
			expect(err).to.eql(null);
			fs.readFile('./school/file_student1.json','utf8', function(err,data){
				if (err) throw "GET - error   -> "+ err; 
				else {
					var fileObj = JSON.parse(data);	
					expect(fileObj).to.be.eql({id:"student1", fname:"BILLY", lname:"HILL", class:"HIST"});
					}
			done();
		});
		
		});
	});
});


	
describe('GET Test ', function(done){
	
	it('GET -JSON data ', function(done){
		chai.request('localhost:3000')
		.get('/school/student')
		.end(function(err,res){
		expect(err).to.eql(null);		
		var actualVal = JSON.parse(res.text.replace(/\n/g, ""));

		expect(actualVal).to.eql({id:"student", name:"JANE DOE"});
		done();
		});
	});
});
	
describe('DELETE Test ', function(done){
	before(function(){
			fs.mkdir('./school', function(err){
						if (err && err.code !==('EEXIST'))throw err; 				
					});
			fs.writeFile('./school/file_student3.json','',function(err){
					if(err) throw err;
				});
		});	

	it('DELETE - Delete File ', function(done){
		chai.request('localhost:3000')
		.del('/school/student3')		
		.end(function(err,res){
		expect(err).to.eql(null);				
		fs.exists('./school/file_student3.json', function (exists){
			expect(exists).to.be.false; // jshint ignore:line
		});
		done();
		});
	  });
	});
});