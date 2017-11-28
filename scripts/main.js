
var hangman = angular.module('hangmanApp', []);

hangman.controller('keyboardController', function($scope) {
    $scope.keys = 'abcdefghijklmnoprstuwvxyz'.split('');

    $scope.pressKey = function(clickedKey) {
        document.getElementById('singleKey').innerHTML = clickedKey;
    }
});