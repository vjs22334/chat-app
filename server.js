var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');
});
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



http.listen(3000,function(){
    console.log("listening on port 3000");
})