'use strict';
var expect =require('chai').expect; 
var utils = require('../lib/utils.js');

describe('Test - utils.js', function(){
    it('Function- getFilename \ninput : (Files,1)', function(){
     expect(utils.getFilename('Files',1)).to.eql('./Files/file_1.json');
    });
});

describe('Test - utils.js', function(){
    it('Function- patchJsonObjs \ninput : 2 JSON objects', function(){
     expect(utils.patchJsonObjs({id:1, name:"JANE", lname:"DOE"},{id:1,name:"jane"}))
     		.to.eql({id:1,name:"JANE", lname:"DOE"});
    });
});

