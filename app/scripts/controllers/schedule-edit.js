'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:ScheduleEditCtrl
 * @description
 * # ScheduleEditCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('ScheduleEditCtrl', function ($scope, Ref, $firebaseArray, $firebaseObject, $timeout, $modal, $window, $location, Config) {
    $scope.schedule = $firebaseArray(Ref.child('devfest2016').child('schedule'));
    $scope.speakers = $firebaseArray(Ref.child('devfest2016').child('speakers'));
    $scope.speakersAsObject = $firebaseObject(Ref.child('devfest2016').child('speakers'));

    $scope.addSpeaker = function(session, speakerId) {
    	var sessionSpeakers = $firebaseArray($scope.schedule.$ref().child(session.$id).child('speakers'));
    	sessionSpeakers.$add(speakerId);
    };

    $scope.rooms = {
	"auditorium":"Main Auditorium",
	"smallauditorium": "Small Auditorium",
	"lab": "Laboratory Classroom",
	"classroom1": "Classroom 1",
	"classroom2": "Classroom 2",
	"classroom3": "Classroom 3",
	"cafeteria": "Cafeteria"};
	
	$scope.categories = "android, chromeweb, design, cloud, iot, reach";
    
});
