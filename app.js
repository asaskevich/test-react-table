const staticServer = require('node-static');

const fileServer = new staticServer.Server('./public');

require('http').createServer((request, response) => {
  request.addListener('end', () => {
    fileServer.serve(request, response);
  }).resume();
}).listen(8080);
