'use strict';

angular.module('devfestApp')
.controller('FeedbackCtrl', function($scope, Auth, Rooms, $state, $stateParams, $firebaseArray, $firebaseObject, Ref) {
	$scope.user = Auth.$getAuth();
	
	if($scope.user && $scope.user.uid) {
    	var syncObject = $firebaseObject(Ref.child('feedback/2016/').child($scope.user.uid).child($stateParams.sessionId));
    	syncObject.$bindTo($scope, 'sessionFeedback');
    	var secondSync = $firebaseObject(Ref.child('users').child($scope.user.uid).child('details'));
    	secondSync.$bindTo($scope, 'userDetails');
    }
    
    if($stateParams.sessionId.length > 0) {
	    $scope.session = $firebaseObject(Ref.child('devfest2016').child('schedule').child($stateParams.sessionId));
	    $scope.speakersAsObject = $firebaseObject(Ref.child('devfest2016').child('speakers'));

	    if($scope.user && $scope.user.uid) {
	    	var favObject = $firebaseObject( Ref.child('users').child($scope.user.uid).child('/agendas/2016').child($stateParams.sessionId) );
	    	favObject.$bindTo($scope, 'favorite');
	    }
	}
	$scope.rooms = Rooms.roomNameList;
	
});