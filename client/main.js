var socket = io.connect('http://192.168.1.35:6677', {'forceNew':true});

socket.on('messages', function(data){
  render(data);
});

function render(data){
  var html = data.map((msg, index) =>{
    return (`<div class="message">
            <strong>${msg.nickname}</strong>
            <span>${msg.texto}</span>
             </div>`);
  }).join(' ');

document.getElementById('messages').innerHTML = html;
};

function addMessage(event){
  var msg = {
    nickname: document.getElementById('nickname').value,
    texto : document.getElementById('texto').value
  };
  document.getElementById('nickname').style.display = 'none';
  document.getElementById('texto').value = "";
  socket.emit('add-message', msg);
  return false;
};
