var app = require('http').createServer(handler),
// var io = require('socket.io')(app);

WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({server: app})
var fs = require('fs');

var totalScore =0;
var over =0;
app.listen(9980);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

wss.on('connection', function (socket) {

  setInterval(function () {
  	var current=Math.floor(Math.random()*6);
  	var comment=["Good Shot", "Text Book Shot", "Hat trick", " Excellent Shot", "Unbelievable miss", "Very good catch by mid-on player"];
	var currentMessage;
	if(current===5){
		currentMessage="<br>Commentator: "+comment[Math.floor(Math.random()*2)];
	}
	else if(current===4|| current===6)
		{
		totalScore=totalScore+current;
		currentMessage="<br>Commentator: "+comment[Math.floor(Math.random()*5)+2]
}
	else
	{
		totalScore=totalScore+current;
		currentMessage="";
	}
	over++;
	var scoreString=totalScore+" runs -  "+over+" overs \n"+currentMessage; 
	try{
  	socket.send(scoreString);
  	}
  	catch(e){
  	
  	}
  },5000);
  

}); 
