'use strict';
/**
 * @ngdoc function
 * @name devfestApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('devfestApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $q, Ref, $firebaseObject, $timeout, Config) {

    $scope.googleLogin = function(){
      var provider = 'google';
      var scope = {scope:'email'};
      console.log('Logging in Google.');
      Auth.$authWithOAuthPopup(provider, scope).then(function (authObject) {
          // Handle success
          console.log(authObject);
          var user = $firebaseObject(Ref.child('users/'+authObject.uid));
          user.$save(authObject);
          redirect();

      }, function (error) {
        console.log(error);
          // Handle error
      });
    };
  
    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }
  });
