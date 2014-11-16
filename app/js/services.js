'use strict';

angular.module('myApp.services', [])
    .value('FIREBASE_URL', 'https://seatme.firebaseio.com')
    .factory('dataService', function($firebase, FIREBASE_URL) {
        var dataRef = new Firebase(FIREBASE_URL);
        var fireData = $firebase(dataRef);

        return fireData
    })
    .factory('partyService', function(dataService) {
//        var parties = dataService.$child('parties'); // child method appends 'parties' to FIREBASE_URL
        var users = dataService.$child('users');

        var partyObject = {
            saveParty: function(party, userId) {
                users.$child(userId).$child('parties').$add(party);
            },
            getPartiesByUserId: function(userId) {
                return users.$child(userId).$child('parties');
            }
        };

        return partyObject
    })
    .factory('textService', function(dataService, partyService) {
        var textMessage = dataService.$child('textMessages');

        var textObject = {
            sendText: function(party, userId) {
            var newText = {
                phoneNumber: party.phone,
                size: party.size,
                name: party.name
                };
                textMessage.$add(newText);
                partyService.getPartiesByUserId(userId).$child(party.$id).$update({notified: 'Yes'});
            }
        };

        return textObject;
    })
    .factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL, dataService) {
        var authRef = new Firebase(FIREBASE_URL);
        var auth = $firebaseSimpleLogin(authRef);
        var emails = dataService.$child('emails');

        var authServiceUser = {
            register: function(user) { // controller passes user
                auth.$createUser(user.email, user.password, user.restaurant).then(function(data) {
                    console.log(data);
                    authServiceUser.login(user, function() {
                        emails.$add({email: user.email});
                    }); // same user as passed in register method
                });
            },
            login: function(user, optionalCallback) { // optionalCallback runs after register -> login
                auth.$login('password', user).then(function(data) {
                    console.log(data);
                    if (optionalCallback) {
                        optionalCallback();
                    }
                    $location.path('/waitlist');   // redirect to /waitlist
                });
            },

            logout: function() {
                auth.$logout(); // see auth above
                $location.path('/');
            },

            getCurrentUser: function() {
                return auth.$getCurrentUser();
            }
        };

        $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
            // save currentUser on rootScope
            $rootScope.currentUser = user;
        });

        $rootScope.$on("$firebaseSimpleLogin:logout", function() {
            $rootScope.currentUser = null;
        });

        return authServiceUser; // make everything an object to ref methods on obj
    });