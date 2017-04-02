var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static('client'));

var messages = [{
  id:1,
  texto:'Bienvenido al chat privado de Node.js y Socket.io',
  nickname:'Bot Servidor'
}];


io.on('connection', (socket) =>{
  console.log("El nodo con IP: " + socket.handshake.address + " se ha conectado...");
  socket.emit('messages', messages);

  socket.on('add-message', (data)=>{
      console.log(data);
      messages.push(data);
      io.sockets.emit('messages', messages);
  });
});



server.listen(6677,() => {
  console.log('Servidor funcionando en http://localhost:6677');
});
