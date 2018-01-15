const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angulcdar DIST output folder
app.use(express.static(path.join(__dirname, 'angular/dist')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'angular/dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
var io = require('socket.io')(server);

io.on("connect",function(socket){
    console.log("user connected");
    socket.on("post message",function(message){
    console.log(message.message);
    console.log(message.username);
    var messageBody={
    "message":message.message,
    "username":message.username
    }
    io.emit("broadcast message",messageBody);
    });
    socket.on("disconnect",function(socket){
        console.log("user disconnected");
    });
});



//listen
server.listen(port, () => console.log(`Running on localhost:${port}`));



/*var app = require('express')();
var http = require('http').Server(app);


/*app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');
});



http.listen(3000,function(){
    console.log("listening on port 3000");
});*/