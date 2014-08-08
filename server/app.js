var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

io.on('connection', function(socket) {
    socket.on('messageSent', function (data) {
        io.emit('messageRecieved', {
            sentAt: new Date(),
            username: data.username,
            message: data.message
        });
    });
});

app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
    console.log('Server listening at port %d', port);
});