'use strict';

var server = require('./lib/httpServer.js');

server.addResource("company");
server.addResource("school");

// above enables:
// get to /employees/id
// post to /employees
// put and patch to /employees/id
// delete to /employees/id


server.startServer(3000);

