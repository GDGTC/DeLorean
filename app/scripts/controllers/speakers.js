'use strict';
angular.module('devfestApp')
.controller('SpeakersCtrl', function ($scope, Ref, $firebaseArray, $firebaseObject, $timeout, $modal, $window, $location, Config) {
	$scope.site = Config;
	$scope.speakers = $firebaseArray(Ref.child('devfest2016').child('speakers'));

	$scope.$on('$viewContentLoaded', function() {
		$window.ga('send', 'pageview', { page: $location.path() });
	});
});

