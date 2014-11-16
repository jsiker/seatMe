'use strict';

angular.module('myApp.controllers', [])
    .controller('LandingPageController', [function(){

    }])
    .controller('WaitListController', ['$scope', 'partyService', 'textService', 'authService', function($scope, partyService, textService, authService) {
//        var partiesRef = new Firebase(FIREBASE_URL + '/parties');  // firebase reference; saves at parties level
//
//        $scope.parties = $firebase(partiesRef); // partiesRef is our data DB object

        // binds user's parties to the scope.parties
        authService.getCurrentUser().then(function(user) {
            if (user) {
                $scope.parties = partyService.getPartiesByUserId(user.id);
            }
        });

        $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No', dateCreated: new Date()};

        $scope.saveParty = function() {
            partyService.saveParty($scope.newParty, $scope.currentUser.id);
            $scope.newParty = {name: '', phone: '', size: '', done:false, notified: 'No', dateCreated: new Date()};
//            $scope.parties.$add($scope.newParty); // grab parties array, add a party object into Firebase
//            $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No'}; //reset values
//
        };

        // function to send text to a group
        $scope.sendText = function(party) {
            textService.sendText(party, $scope.currentUser.id); // uses currentUser from scope to get id
            console.log('ring!');
            console.log(party)
        };
    }])
    .controller('AuthController', ['$scope', 'authService', function($scope, authService) {

        // object bound to inputs on register and login
        $scope.user = {email: '', password: ''};

        $scope.register = function() {
            authService.register($scope.user); // below functions all come from authService
        };

        $scope.login = function() {
            authService.login($scope.user);
        };

        $scope.logout = function () {
            authService.logout()
        };

    }]);