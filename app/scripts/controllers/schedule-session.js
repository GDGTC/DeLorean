'use strict';

/**
 * @ngdoc function
 * @name devfestApp.controller:SessionModalCtrl
 * @description
 * # SessionModalCtrl
 * Controller of the devfestApp
 */
angular.module('devfestApp')
.controller('SessionModalCtrl', function ($scope, $modalInstance, Auth, Rooms, $state, $stateParams, $firebaseArray, $firebaseObject, Ref) {
	$scope.user = Auth.$getAuth();
	$scope.categories = 'android, chromeweb, design, cloud, iot, reach';
	$scope.speakers = $firebaseArray(Ref.child('devfest2016').child('speakers'));
	$scope.speakersAsObject = $firebaseObject(Ref.child('devfest2016').child('speakers'));
	$scope.rooms = Rooms.roomNameList;

	$scope.cancel = function () {
	  $modalInstance.dismiss('cancel');
	};

	if($stateParams.sessionId === 'new') {
		$scope.editMode = true;
		$scope.session = {};
	} else if($stateParams.sessionId && $stateParams.sessionId.length > 0) {
		$scope.session = $firebaseObject(Ref.child('devfest2016').child('schedule').child($stateParams.sessionId));
		if($scope.user && $scope.user.uid) {
			var favObject = $firebaseObject( Ref.child('users').child($scope.user.uid).child('/agendas/2016').child($stateParams.sessionId) );
			favObject.$bindTo($scope, 'favorite');
		}
	} else {
		console.log('Leaving the page because we could not find a session ID.');
		$scope.cancel();
		return;
	}

	$scope.viewSpeaker = function(id) {
		$modalInstance.dismiss({action:'speakerForward',id:id});
	};

	$scope.giveFeedback =  function(){
		$modalInstance.dismiss({action:'feedbackForward',id:$stateParams.sessionId});
	};


	$scope.saveSession = function(session) {
		if(session.$id) {
			console.log('Updating session.');
			session.$save();
		} else {
			console.log('Creating new session.');
			$scope.sessions = $firebaseArray(Ref.child('devfest2016').child('schedule'));
			$scope.sessions.$add(session);
		}
		$scope.cancel();
	};
	$scope.deleteSession = function(session) {
		if (window.confirm('Are you sure you want to delete this session?')) {
			
			console.log('Deleting session with ID ', session.$id);
			session.$remove();
			$scope.cancel();
		}
	};

	$scope.addSpeaker = function(session, speakerId) {
		var sessionSpeakers = $firebaseArray(Ref.child('devfest2016/schedule').child(session.$id).child('speakers'));
		sessionSpeakers.$add(speakerId);
	};

	$scope.removeSpeaker = function(session, id) {
		if (session.$id && window.confirm('Are you sure you want to remove this speaker from this session?')) {
			console.log('Deleting ' + id + 'from session ' + session.$id);
			var sessionSpeaker = $firebaseObject(Ref.child('devfest2016/schedule/').child(session.$id).child('speakers').child(id));
			sessionSpeaker.$remove();
		}
	};
});