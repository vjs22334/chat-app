$(function(){
                          var socket = io();
                          var msgList = [];

                          var msg = document.getElementById("msglist");
                          $("#submit").click(function(){
                              var messageBody={
                              "message":$("#message").val(),
                              "username":$("#userName").val()
                              };
                              $("#message").val("");
                              socket.emit("post message",messageBody);
                          });
                          socket.on("broadcast message",function(message){
                          msgList.push(message.message+"@"+message.username);
                          console.log(msgList);
                          var msgDisplay = '';
                          for(let msg of msgList)
                          {
                              msgDisplay = msgDisplay+"<li>"+msg+"</li>";
                          }
                           msg.innerHTML=msgDisplay;
                          });
                      });
