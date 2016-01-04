'use strict';

var rooms = {
	"auditorium":"Main Auditorium",
	"smallauditorium": "Small Auditorium",
	"lab": "Laboratory Classroom",
	"classroom1": "Classroom 1",
	"classroom2": "Classroom 2",
	"classroom3": "Classroom 3"};
var roomOrder = Object.keys(rooms);


/**
 * @ngdoc function
 * @name devfestApp.controller:ScheduleCtrl
 * @description
 * # ScheduleCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
  .controller('ScheduleCtrl', function ($scope, Auth, Ref, $firebaseArray, $firebaseObject, $timeout, $modal, $window, $location, Config) {
  	var user = Auth.$getAuth();
  	if(user && user.uid) {
  		$scope.agenda = $firebaseObject( Ref.child('users').child(user.uid).child('/agendas/2016') );
  	}
    $scope.schedule = $firebaseArray(Ref.child('devfest2016').child('schedule'));
    $scope.speakersAsObject = $firebaseObject(Ref.child('devfest2016').child('speakers'));
    
    $scope.rooms = rooms;
    $scope.roomOrder = roomOrder;

	// I hate timezones. - Stephen 2015-12-22 11:48 GMT -6

    // Timezones suck. All DB dates are in UTC
    var everythingStart = new Date(Date.UTC(2016,2,6,14,0,0));


	var unwatch = $scope.schedule.$watch(function() {
		/**
		 * We really need to fix this! This runs n times for when we load n items
		 */
  		console.log("data changed!");
  		//console.log($scope.schedule);

  		var i, p, prettySchedule;


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
  				p[hour].all.push(session);
  			} else if(session.room) {
  				p[hour][session.room].push(session);
  			} else {
  				//room not specified and it's not an "all attendee", somebody messed up their data entry!
  			}
  		}

  		$scope.prettySchedule = p;

	});
	
	$scope.openFormModal = function(session) {
		console.log("Modal is now open with ",session);
		$scope.session = session;
		
		/*var modalInstance = $modal.open({
		  animation: true,
		  templateUrl: 'views/schedule-session.html',
		  controller: 'SessionModalCtrl',
		  resolve: {
		    session: function() {
		      return $scope.session;
		    },
		    speakersAsObject: function() {
		    	return $scope.speakersAsObject;
		    }
		  }
		});
		modalInstance.result.then(function(results) {
		  if (results.action === 'add') {
		    $scope.add(results.session);
		  } else if (results.action === 'edit') {
		    $scope.edit(results.session);
		  }
		});*/
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
  	
  	
    $scope.session = $firebaseObject(Ref.child('devfest2016').child('schedule').child($stateParams.sessionId));
    $scope.speakersAsObject = $firebaseObject(Ref.child('devfest2016').child('speakers'));

    if($scope.user && $scope.user.uid) {
    	var favObject = $firebaseObject( Ref.child('users').child($scope.user.uid).child('/agendas/2016').child($stateParams.sessionId) );
    	favObject.$bindTo($scope, 'favorite');
    }
    
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
      
    };
    
     $scope.rooms = {
		"auditorium":"Main Auditorium",
		"smallauditorium": "Small Auditorium",
		"lab": "Laboratory Classroom",
		"classroom1": "Classroom 1",
		"classroom2": "Classroom 2",
		"classroom3": "Classroom 3",
		"cafeteria": "Cafeteria"};
});
  
  