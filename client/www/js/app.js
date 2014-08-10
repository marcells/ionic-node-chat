angular.module('starter', ['ionic'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
        
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

angular.module('starter')
    .controller('ChatController', ['$scope', function ($scope) {
        var self = $scope.chat = this;

        var socket = io.connect('http://192.168.2.111:3000/');

        self.messages = [];
        self.username = '';
        self.currentMessageText = '';

        self.sendMessage = function () {
            console.log({
                username: self.username,
                message: self.currentMessageText
            });

            socket.emit('messageSent', {
                username: self.username,
                message: self.currentMessageText
            });

            self.currentMessageText = '';
        };

        socket.on('messageRecieved', function (data) {
            var sentAt = new Date(data.sentAt).toLocaleTimeString();

            self.messages.push({
                sentAt: sentAt,
                username: data.username,
                message: data.message
            });

            $scope.$apply();
        });
    }]);