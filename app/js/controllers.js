'use strict';

angular.module('myApp.controllers', [/*"highcharts-ng"*/])
    .controller('LandingPageController', [function(){

    }])
    .controller('WaitListController', ['$scope', 'partyService', 'textService', 'authService', function($scope, partyService, textService, authService) {

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
        $scope.user = {email: '', password: '', restaurant: ''};

        $scope.register = function() {
            authService.register($scope.user); // below functions all come from authService
        };

        $scope.login = function() {
            authService.login($scope.user);
        };

        $scope.logout = function () {
            authService.logout()
        };

//    }])
//    .controller('ChartController', ['$scope', function($scope) {
//        $scope.chartConfig = {
//            options: {
//                chart: {
//                    type: 'line',
//                    zoomType: 'x'
//                }
//            },
//            series: [{
//                data: [10, 9, 5, 7, 8, 4, 3, 1, 8, 10]
//            }],
//            title: {
//                text: 'Test'
//            },
//            xAxis: {currentMin: 0, currentMax: 10, minRange: 1},
//            loading: false
//        }
    }]);