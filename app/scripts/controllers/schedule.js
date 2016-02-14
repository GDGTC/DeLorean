'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
.controller('ScheduleCtrl', function ($scope, Auth, Ref, Rooms, $firebaseArray, $firebaseObject) {
	var user = Auth.$getAuth();
	if(user && user.uid) {
		$scope.agenda = $firebaseObject( Ref.child('users').child(user.uid).child('/agendas/2016') );
	}
	$scope.schedule = $firebaseArray(Ref.child('devfest2016').child('schedule'));
	$scope.speakersAsObject = $firebaseObject(Ref.child('devfest2016').child('speakers'));

	$scope.rooms = Rooms.namedRoomList;


	// I hate timezones. - Stephen 2015-12-22 11:48 GMT -6

	$scope.schedule.$watch(function() {
		/**
		 * We really need to fix this! This runs n times for when we load n items
		 */
		console.log('Schedule data changed, reprocessing.');
		
		var i, p;


		// First let's make an 2 dimensions array of objects for 
		// Outer Array: our time slots
		// Inner Array: Our schedule-rendered rooms
		// 8AM to 5PMZ
		p = {};
		for (i = 8; i <= 17; i++) {
			p[i] = {all:[]};
			for (var room in $scope.rooms) {
				p[i][room] = [];
			}
		}
		$scope.orphans = [];

		// Now let's put all of our schedule items into their time slots
		for (i = $scope.schedule.length - 1; i >= 0; i--) {
			var session = $scope.schedule[i];
			var hour = new Date(session.startTime).getUTCHours();
			hour = hour - 6; // Get us back to Central time regardless of locale;

			if(session.all) {
				// Only add it if it's within our std time range
				if(p[hour]) {
					p[hour].all.push(session);
				}
			} else if(session.room && p[hour] && p[hour][session.room] && p[hour][session.room].length === 0) {
					p[hour][session.room].push(session);
			} else {
				//room not specified and it's not an "all attendee", somebody messed up their data entry!
				console.log('Room ' + session.room + ' didn\'t exist or');
				console.log('Hour ' + hour + ' didn\'t match our schedule');
				$scope.orphans.push(session);
			}
		}

		$scope.prettySchedule = p;

	});

	$scope.openFormModal = function(session) {
		console.log('Modal is now open with ',session);
		$scope.session = session;
	};
});

/**

Let's make the data look like
[{UTCTIME8AM:
	{alls:
	 [{},{}]
	 room1: {}
	 room2: {}
	}
}]

*/