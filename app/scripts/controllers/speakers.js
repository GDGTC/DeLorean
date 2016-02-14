'use strict';
angular.module('devfestApp')
.controller('SpeakersCtrl', function ($scope, Ref, $firebaseArray, $firebaseObject, $timeout, $uibModal, $window, $location, Config) {
	$scope.site = Config;
	$scope.speakers = $firebaseArray(Ref.child('devfest2016').child('speakers'));
});

