
var http = require('http');

http.createServer(function handler(req, res) {
	
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello COvayurt\nHello World!');    
    
}).listen('localhost');



console.log('Server running at http://127.0.0.1:80/');
