'use strict';

var rooms = {
	"auditorium":"Main Auditorium",
	"smallauditorium": "Small Auditorium",
	"lab": "Laboratory Classroom",
	"classroom1": "Classroom 1",
	"classroom2": "Classroom 2",
	"caffeteria": "Caffeteria"};
var roomOrder = Object.keys(rooms);

var times = {
	0:"8AM",
	1:"9AM",
	2:"10AM",
	3:"11AM",
	4:"12PM",
	5:"1PM",
	6:"2PM",
	7:"3PM",
	8:"4PM",
	9:"5PM"
};
var timesOrder = Object.keys(times);

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
    $scope.roomOrder = roomOrder;
    $scope.times = times;
//    $scope.timeslottimes = [];


    
	var unwatch = $scope.schedule.$watch(function() {
  		console.log("data changed!");
  		console.log($scope.schedule);
  		var startTimes = [];

		for(var t=0;t<timesOrder.length;t++){
			startTimes[t] = [];
			for(var r=0;r<roomOrder.length;r++){
				startTimes[t][r] = 0;		
			}
		}
  		for(var i = 0;i<$scope.schedule.length;i++) {
  			var session = $scope.schedule[i];
  			var ro = roomOrder.indexOf(session.room);
  			startTimes[session.timeslot][ro] = session;
  		}
  		console.log("Finished processing, generated:",startTimes);
  		console.log("Timeslottimes", times);
  		//TODO: startTimes.sort();
  		$scope.timeSlots = startTimes;
	});
});
