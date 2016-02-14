'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('devfestApp')
  .controller('AccountCtrl', function ($scope, Auth, Ref, $firebaseObject, $timeout, $state) {
    $scope.user = Auth.$getAuth();
    $scope.logout = function() { 
      Auth.$unauth();
      $state.go('schedule'); 
    };
    $scope.messages = [];
    console.log(Auth);

    function error(err) {
      alert(err, 'danger');
    }

    function success(msg) {
      alert(msg, 'success');
    }

    function alert(msg, type) {
      var obj = {text: msg+'', type: type};
      $scope.messages.unshift(obj);
      $timeout(function() {
        $scope.messages.splice($scope.messages.indexOf(obj), 1);
      }, 10000);
    }
  });
