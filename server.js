const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
var mysql      = require('mysql');
 var pool      =    mysql.createPool({
     connectionLimit : 100, //important
     host     : 'localhost',
     user     : 'root',
     password : 'root',
     database : 'chatapp',
     debug    :  false,
     port     :  "3306"
 });




// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.post('/api/login', (req, res) => {
    var username=req.body.username;
    var password=req.body.password;
    pool.getConnection(function(err,connection){
             if (err) {
               connection.release();
               res.json({"code" : 100, "status" : "Error in connection database"});
               return;
             }
//TODO add pasword hashing
             console.log('connected as id ' + connection.threadId);

             connection.query('select * from user where username = "' + username + '";',function(err,rows){
                 connection.release();
                 if(!err) {
                 if(rows.length==0)
                 {
                   res.json({"code": 404, "status": "username not found"});
                 }
                 else{
                         console.log(rows[0].password);

                         if(rows[0].password==password)
                         {
                            res.json({"code": 200, "status": "loggedin"});
                         }
                         else{
                            res.json({"code": 400, "status": "wrong password"});
                         }
                     }
                 }
             });

             connection.on('error', function(err) {
                   res.json({"code" : 100, "status" : "Error in connection database"});
                   connection.release();
                   return;
             });
       });
});
app.post('/api/createUser', (req, res) => {
    var username=req.body.username;
    var password=req.body.password;
    pool.getConnection(function(err,connection){
             if (err) {
               connection.release();
               res.json({"code" : 100, "status" : "Error in connection database"});
               return;
             }
//TODO add input sanitation
             console.log('connected as id ' + connection.threadId);

             connection.query('INSERT INTO `chatapp`.`user` (`username`, `password`) VALUES ("'+username+'", "'+password+'");',function(err,rows){
                 connection.release();
                 if(!err) {
                   res.json({"code": 201, "status": "user sucessfully created"});
                 }
                 else{
                    res.json({"code": 500, "status": "internal server error"});
                     }

             });

             connection.on('error', function(err) {
                   res.json({"code" : 100, "status" : "Error in connection database"});
                   connection.release();
                   return;
             });
       });
});

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