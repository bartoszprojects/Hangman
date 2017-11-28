
const hangman = angular.module('hangmanApp', []);

hangman.service('getDataService', function ($http) {
    this.jsonData = function() {
        return $http.get('scripts/data.json')
    }
});

hangman.controller('keyboardController', ($scope, $http, getDataService) =>{
    $scope.keys = 'abcdefghijklmnoprstuwvxyz'.split('');

    $scope.pressKey = function(clickedKey) {
        document.getElementById('singleKey').innerHTML = clickedKey;
    };
    

    getDataService.jsonData().then((response) => $scope.words = response.data);

});