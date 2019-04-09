var http = require('http');
var fs = require('fs');

var server = http.createServer( function(req, res) 
			       	{
    					fs.readFile( './index.html', 
						     'utf-8', 
						     function(error, content) 	
						     { 
						      res.writeHead(200, {"Content-Type": "text/html"});
						      res.end(content); 
						     }
						   );
                        	}
			      );

var io  = require('socket.io').listen(server);
var msg = 'Vous êtes connnecté !'
var id = 0

io.sockets.on('connection', 
	      function (sck) 	
	      { 
		id = id + 1;
		console.log('Un client (id: '+id+') est connecté !');
		sck.emit('msg_sc', msg);
		sck.on('msg_cs',
			  function(msg)
			  {
		  	   	console.log(sck.pseudo+'(id:'+sck.id+')'+ " : " + msg);
			  });
	     	
		sck.on('new_user', 
			  function(pseudo) 
			  {
				sck.pseudo = pseudo;
				sck.id = id;
	     		  });
	      });

server.listen(8080);
