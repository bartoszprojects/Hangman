const hangman = angular.module('hangmanApp', []);

hangman.service('getDataService', function ($http) {
    this.jsonData = function () {
        return $http.get('scripts/data.json')
    }
});

hangman.controller('keyboardController', ($scope, $http, getDataService) => {

    $scope.keys = 'abcdefghijklmnoprstuwvxyz'.split('');

    let jsonData = function () {
        return $http.get('scripts/data.json');
    };

    jsonData().then(resolved);

    function resolved(response) {
        $scope.words = response.data.statements;
        $scope.promptList = [];
        $scope.answerList = [];
        $scope.error = 0;
        $scope.subpoint = 0;
        $scope.imgUrl = 0;

        let json_length = Object.keys($scope.words).length;

        for (let key in $scope.words) {
            let value = $scope.words[key];
            $scope.promptList.push(value['prompt']);
            $scope.answerList.push(value['answer']);
        }

        let randomNumber = Math.floor((Math.random() * $scope.answerList.length));

        function check(myList, searchedElement) {
            let elements = [];
            for (let i = 0; i < myList.length; i++) {
                if (myList[i] === searchedElement) {
                    elements.push(i)
                }
            }
            return elements;
        }
        $scope.currentWord = $scope.answerList[randomNumber];
        $scope.currentPrompt = $scope.promptList[randomNumber];
        $scope.splittedWord = $scope.currentWord.split('');
        $scope.hiddenWord = $scope.currentWord.replace(/\S/gi, '*');
        $scope.returnedWord = $scope.hiddenWord.split('');
        $scope.ultimateWord = $scope.returnedWord.join('');

        $scope.pressKey = function (myVar) {
            let correct = false;
            let tempBtn = document.getElementById('button' + myVar);
            tempBtn.disabled = true;
            let returnedIndex = check($scope.splittedWord, myVar);
            console.log(returnedIndex);

            $scope.splittedWord.forEach((val, index) => {
                if (val === myVar) {
                    correct = true;
                    tempBtn.style.border = '1px solid green';

                    returnedIndex.forEach((value) => {
                        $scope.returnedWord[value] = myVar
                    });
                }
                $scope.ultimateWord = $scope.returnedWord.join('');
                console.log(val);
                console.log(index)
            });
            correct === true ? $scope.subpoint += 1 : (($scope.error += 1) && ($scope.imgUrl += 1) &&
            (tempBtn.style.border = '1px solid red'));
        }
    }

});