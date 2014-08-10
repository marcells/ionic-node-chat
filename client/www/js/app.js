// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var socket = io.connect('http://localhost:3000/');

    $('#sendMessage').click(function () {
        socket.emit('messageSent', {
            username: $('#username').val(),
            message: $('#message').val()
        });

        $('#message').val('');
    });

    socket.on('messageRecieved', function (data) {
        var sentAt = new Date(data.sentAt).toLocaleTimeString();

        $('#messages')
            .append($('<div>').attr('class', 'row')
                .append($('<div>').attr('class', 'col col-20').append(sentAt))
                .append($('<div>').attr('class', 'col col-20').append(data.username))
                .append($('<div>').attr('class', 'col').append(data.message)));
    });
  });
})
