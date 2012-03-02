var http = require('http'),
	path = require('path'),
	fs = require('fs'),
	port = process.env.PORT || 8000;
	
http.createServer(function(req, res) {
	var filename = path.basename(req.url) || "index.html",
	  ext = path.extname(filename),
	  localPath = __dirname + "/public/";
	  
	if (ext == ".html") {
	  localPath += filename;
	
		path.exists(localPath, function(exists) {
			if (exists) {
			  getFile(localPath, res);
			} else {
			  res.writeHead(404);
			  res.end();
			}
		});
	}	
}).listen(port);

console.log("Listening on " + port);

function getFile(localPath, res) {
	fs.readFile(localPath, function(err, contents) {
		if (!err) {
		  res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}