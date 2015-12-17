'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:ScheduleEditCtrl
 * @description
 * # ScheduleEditCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('ScheduleEditCtrl', function ($scope, Ref, $firebaseArray, $timeout, $modal, $window, $location, Config) {
    $scope.schedule = $firebaseArray(Ref.child('devfest2016').child('schedule'));
    $scope.speakers = $firebaseArray(Ref.child('devfest2016').child('speakers'));
    
});
