'use strict';

var rooms = {
	'auditorium':'Main Auditorium',
	'smallauditorium': 'Small Auditorium',
	'lab': 'Laboratory Classroom',
	'classroom1': 'Classroom 1',
	'classroom2': 'Classroom 2',
	'classroom3': 'Classroom 3'};
var roomOrder = Object.keys(rooms);


/**
 * @ngdoc function
 * @name devfestApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('ScheduleCtrl', function ($scope, Auth, Ref, $firebaseArray, $firebaseObject) {
  	var user = Auth.$getAuth();
  	if(user && user.uid) {
  		$scope.agenda = $firebaseObject( Ref.child('users').child(user.uid).child('/agendas/2016') );
  	}
    $scope.schedule = $firebaseArray(Ref.child('devfest2016').child('schedule'));
    $scope.speakersAsObject = $firebaseObject(Ref.child('devfest2016').child('speakers'));
    
    $scope.rooms = rooms;
    $scope.roomOrder = roomOrder;

	// I hate timezones. - Stephen 2015-12-22 11:48 GMT -6

	$scope.schedule.$watch(function() {
		/**
		 * We really need to fix this! This runs n times for when we load n items
		 */
  		console.log('Schedule data changed, reprocessing.');
  		//console.log($scope.schedule);

  		var i, p;


  		// First let's make an array of objects for our time slots
  		p = {};
  		for (i = 8; i <= 17; i++) {
  			p[i] = {all:[]};
  			for (var room in rooms) {
  				p[i][room] = [];
  			}
  		}

  		// Now let's put all of our schedule items into their time slots
  		for (i = $scope.schedule.length - 1; i >= 0; i--) {
  			var session = $scope.schedule[i];
  			var hour = new Date(session.startTime).getUTCHours();
  			hour = hour - 6; // Get us back to Central time regardleses of locale;

  			if(session.all) {
  				// Only add it if it's within our std time range
  				if(p[hour]) {
  					p[hour].all.push(session);
  				}
  			} else if(session.room) {
  				if(p[hour]) {
  					p[hour][session.room].push(session);
  				}
  			} else {
  				//room not specified and it's not an "all attendee", somebody messed up their data entry!
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


/**
 * @ngdoc function
 * @name devfestApp.controller:SessionModalCtrl
 * @description
 * # SessionModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('SessionModalCtrl', function ($scope, $modalInstance, Auth, $state, $stateParams, $firebaseArray, $firebaseObject, Ref) {
  	$scope.user = Auth.$getAuth();

    if($scope.user && $scope.user.uid) {
    	var syncObject = $firebaseObject(Ref.child('feedback/2016/').child($scope.user.uid).child($stateParams.sessionId));
    	syncObject.$bindTo($scope, 'sessionFeedback');
    	var secondSync = $firebaseObject(Ref.child('users').child($scope.user.uid).child('details'));
    	secondSync.$bindTo($scope, 'userDetails');
    }
  	

  	$scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.viewSpeaker = function(id) {
    	$modalInstance.dismiss({action:'speakerForward',id:id});
    };


  	if($stateParams.sessionId.length > 0) {
	    $scope.session = $firebaseObject(Ref.child('devfest2016').child('schedule').child($stateParams.sessionId));
	    $scope.speakersAsObject = $firebaseObject(Ref.child('devfest2016').child('speakers'));

	    if($scope.user && $scope.user.uid) {
	    	var favObject = $firebaseObject( Ref.child('users').child($scope.user.uid).child('/agendas/2016').child($stateParams.sessionId) );
	    	favObject.$bindTo($scope, 'favorite');
	    }
	} else {
		$scope.cancel();
	}

    
    
    
     $scope.rooms = {
		'auditorium':'Main Auditorium',
		'smallauditorium': 'Small Auditorium',
		'lab': 'Laboratory Classroom',
		'classroom1': 'Classroom 1',
		'classroom2': 'Classroom 2',
		'classroom3': 'Classroom 3',
		'cafeteria': 'Cafeteria'};
});
  
  