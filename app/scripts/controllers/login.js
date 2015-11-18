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
        createProfile(authObject);
        redirect();

      }, function (error) {
        // Handle error
        console.log(error);
      });
    };

   function createProfile(user) {
      var ref = Ref.child('users/'+ user.uid), def = $q.defer();
      ref.set(user, function(err) {
        $timeout(function() {
          if( err ) {
            def.reject(err);
          }
          else {
            def.resolve(ref);
          }
        });
      });
      return def.promise;
    };
  
    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }
  });
