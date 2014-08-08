$(function() {
    var socket = io();

    $(window).keydown(function (event) {
        if (event.which === 13) {
            socket.emit('messageSent', {
                username: $('#username').val(),
                message: $('#message').val()
            });

            $('#message').val('');
        }
    });

    socket.on('messageRecieved', function (data) {
        var sentAt = new Date(data.sentAt).toLocaleTimeString();

        $('#messages')
            .append($('<li>')
                .append($('<span>').attr('class', 'sentAt').append(sentAt))
                .append($('<span>').attr('class', 'username').append(data.username))
                .append($('<span>').attr('class', 'message').append(data.message)));
    });
});