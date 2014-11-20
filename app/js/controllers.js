'use strict';

angular.module('myApp.controllers', ['angularPayments'])
    .controller('LandingPageController', [function(){

    }])
    .controller('WaitListController', ['$scope', 'partyService', 'textService', 'authService', function($scope, partyService, textService, authService) {

        // binds user's parties to the scope.parties
        authService.getCurrentUser().then(function (user) {
            if (user) {
                $scope.user = user;
                $scope.parties = partyService.getPartiesByUserId(user.id);
            }
        });

        $scope.restaurant = authService.getCurrentUser();
        $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No', dateCreated: new Date()};

        $scope.saveParty = function () {
            partyService.saveParty($scope.newParty, $scope.currentUser.id);
            $scope.newParty = {name: '', phone: '', size: '', done: false, notified: 'No', dateCreated: new Date()};
        };

        // function to send text to a group
        $scope.sendText = function (party) {
            textService.sendText(party, $scope.currentUser.id); // uses currentUser from scope to get id
        };
    }])
    .controller('AuthController', ['$scope', 'authService', function($scope, authService) {

        // object bound to inputs on register and login
        $scope.user = {email: '', password: ''/*, restaurant: ''*/};

        $scope.register = function () {
            authService.register($scope.user); // below functions all come from authService
        };

        $scope.login = function () {
            authService.login($scope.user);
        };

        $scope.logout = function () {
            authService.logout()
        };
    }])
    .config(function() {
    window.Stripe.setPublishableKey('pk_test_0ka22OyPdHUkD8DrphKsXUDy');
	})
    .controller('EatController', ['$scope', 'authService', 'partyService', 'foodService', 'Firebase', function($scope, authService, partyService, Firebase) {
        authService.getCurrentUser().then(function(user) {
            if (user) {
                $scope.user = user;
                $scope.parties = partyService.getPartiesByUserId(user.id);
            }
        });
                $scope.food = [
            {
                "name": "Tomato Soup",
                "price": 5,
                "quantity": ''
            }, {
                "name": "Garden Salad",
                "price": 5,
                "quantity": ''
            }, {
                "name": "Dinner Plate",
                "price": 12,
                "quantity": ''
            }

        ];

        $scope.addToCart = function(food) {
            $scope.food[0].quantity = $scope.food.zero;
            $scope.food[1].quantity = $scope.food.one;
            $scope.food[2].quantity = $scope.food.two;

        };

        $scope.getTotal = function() {
            var total = 0;
            for(var i = 0; i < $scope.food.length; i++) {
                var f = $scope.food[i];
                total += (f.price * f.quantity);
                if (total == null) {
                    total = ''
                }
            }
            return total;
        };
        // Stripe Response Handler
		$scope.stripeCallback = function (code, result) {
			if (result.error) {
				window.alert('it failed! error: ' + result.error.message);
			} else {
				window.alert('success! token: ' + result.id);
			}
		};
    }]);