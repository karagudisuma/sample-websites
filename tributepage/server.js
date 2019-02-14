let http = require('http');
let fs = require('fs');
let path = require('path');


http.createServer((req, res) => {
	let pathName = '.' + req.url;
	if (pathName == './')
		pathName = './index.html';
	let ext = path.extname(req.url);
	let contentType = 'text/html';
	contentType = (ext === '.css') ? 'text/css' : contentType;
	fs.readFile(pathName, (err, index) => {
		if(err){
			res.writeHead(500, {'content-type': contentType});
			res.end(`Error loading file ${err.code}`, 'utf-8');
		}
		else{
			res.writeHead(200, {'content-type': contentType});
			res.end(index, 'utf-8');
		}
	});
}).listen(3000);
