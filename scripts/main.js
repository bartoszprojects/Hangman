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
        let json_length = Object.keys($scope.words).length;


        for (let key in $scope.words) {
            let value = $scope.words[key];
            console.log(key, value);
            console.log(value['answer']);
            $scope.promptList.push(value['prompt']);
            $scope.answerList.push(value['answer']);
            console.log($scope.promptList);
            console.log($scope.answerList);
        }

        let randomNumber = Math.floor((Math.random() * $scope.answerList.length));
        console.log('----------------------');
        console.log('random numbers: ', randomNumber, 1);
        console.log('!!!! ', $scope.promptList[randomNumber]);
        let splittedPromptList = $scope.promptList.splice(randomNumber, 1);
        console.log($scope.promptList)

        function check(myList, searchedElement) {
            let elements = [];
            for (let i = 0; i < myList.length; i++) {
                if (myList[i] === searchedElement) {
                    elements.push(i)
                }
            }
            return elements;
        }

        $scope.currentWord = $scope.promptList[randomNumber];
        $scope.splittedWord = $scope.currentWord.split('');
        $scope.hiddenWord = $scope.currentWord.replace(/\S/gi, '*');
        $scope.returnedWord = $scope.hiddenWord.split('');
        $scope.ultimateWord = $scope.returnedWord.join('');

        $scope.pressKey = function (myVar) {
            let returnedIndex = check($scope.splittedWord, myVar);
            console.log(returnedIndex);

            $scope.splittedWord.forEach((val, index) => {

                if (val === myVar) {
                    $scope.correct = true;
                    console.log('matched !');


                    returnedIndex.forEach((value) => {

                        $scope.returnedWord[value] = myVar
                    });
                }

                $scope.ultimateWord = $scope.returnedWord.join('');
                console.log(val);
                console.log(index)
            });
        }

    }


});