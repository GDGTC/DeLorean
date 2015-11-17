'use strict';

var rooms = {
	"auditorium":"Main Auditorium",
	"smallauditorium": "Small Auditorium",
	"lab": "Laboratory Classroom",
	"classroom1": "Classroom 1",
	"classroom2": "Classroom 2"};
var roomOrder = Object.keys(rooms);

/**
 * @ngdoc function
 * @name devfestApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('ScheduleCtrl', function ($scope, Ref, $firebaseArray, $timeout, $modal, $window, $location, Config) {
    $scope.schedule = $firebaseArray(Ref.child('schedule'));
    $scope.rooms = rooms;
    
	var unwatch = $scope.schedule.$watch(function() {
  		console.log("data changed!");
  		console.log($scope.schedule);
  		var startTimes = {};
  		for(var i = 0;i<$scope.schedule.length;i++) {
  			var session = $scope.schedule[i];
  			if(session.all === true) {
  				startTimes[session.startTime] = session;
  			}
  			
  			if(!startTimes[session.startTime]) {
  				startTimes[session.startTime] = [];
  			}
  			startTimes[session.startTime][roomOrder.indexOf(session.room)] = session;
  		}
  		console.log("Finished processing, generated:",startTimes);
  		//TODO: startTimes.sort();
  		$scope.timeSlots = startTimes;
	});
});
