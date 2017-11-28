const hangman = angular.module('hangmanApp', []);

hangman.service('getDataService', function ($http) {
    this.jsonData = function () {
        return $http.get('scripts/data.json')
    }
});

hangman.controller('keyboardController', ($scope, $http, getDataService) => {

    $scope.keys = 'abcdefghijklmnoprstuwvxyz'.split('');
    $scope.imgUrl = 1;

    let jsonData = function () {
        return $http.get('scripts/data.json');
    };

    jsonData().then(resolved);

    function resolved(response) {
        $scope.words = response.data.statements;
        $scope.promptList = [];
        $scope.answerList = [];
        $scope.mainPoint = -1;

        let json_length = Object.keys($scope.words).length;

        for (let key in $scope.words) {
            let value = $scope.words[key];
            $scope.promptList.push(value['prompt']);
            $scope.answerList.push(value['answer']);
        }

        console.log($scope.promptList);
        console.log($scope.answerList);

        $scope.nextGame = function () {

            $scope.promptList.splice($scope.randomNumber, 1);
            $scope.answerList.splice($scope.randomNumber, 1);
            $scope.randomNumber = Math.floor((Math.random() * $scope.answerList.length));

            $scope.currentWord = $scope.answerList[$scope.randomNumber];
            $scope.currentPrompt = $scope.promptList[$scope.randomNumber];
            $scope.splittedWord = $scope.currentWord.split('');
            $scope.hiddenWord = $scope.currentWord.replace(/\S/gi, '*');
            $scope.returnedWord = $scope.hiddenWord.split('');
            $scope.ultimateWord = $scope.returnedWord.join('');

            $scope.subpoint = 0;
            $scope.error = 0;
            $scope.imgUrl = 1;
            $scope.mainPoint += 1;

            $scope.resetHTML()
        };

        $scope.resetHTML = function () {
            $scope.keys.forEach((value) => {
                let tempBtn = document.getElementById('button' + value);
                tempBtn.disabled = false;
                tempBtn.style.border = '1px solid gray';
                console.log(value)
            })
        };

        $scope.$watch('ultimateWord', () => {
            $scope.ultimateWord === $scope.currentWord ? $scope.nextGame() : console.log('bad')

        });

        $scope.$watch('imgUrl', () => {
            $scope.imgUrl >= 7 ? $scope.nextGame() : console.log('still good')
        });


        $scope.nextGame();

        function check(myList, searchedElement) {
            let elements = [];
            for (let i = 0; i < myList.length; i++) {
                if (myList[i] === searchedElement) {
                    elements.push(i)
                }
            }
            return elements;
        }

        $scope.pressKey = function (myVar) {
            let tempBtn = document.getElementById('button' + myVar);
            tempBtn.disabled = true;
            let correct = false;
            let returnedIndex = check($scope.splittedWord, myVar);
            console.log(returnedIndex);

            $scope.splittedWord.forEach((val) => {
                if (val === myVar) {
                    correct = true;
                    tempBtn.style.border = '1px solid green';
                    returnedIndex.forEach((value) => {
                        $scope.returnedWord[value] = myVar
                    });
                }
                $scope.ultimateWord = $scope.returnedWord.join('');

            });
            correct === true ? $scope.subpoint += 1 : (($scope.error += 1) && ($scope.imgUrl += 1) &&
                (tempBtn.style.border = '1px solid red'));
        };

    }

});