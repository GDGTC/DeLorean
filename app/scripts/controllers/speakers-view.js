'use strict';
angular.module('devfestApp')
.controller('SpeakerModalCtrl', function ($scope, Ref, $window, $modalInstance, $firebaseObject, $firebaseArray, $stateParams) {
	$scope.speakers = $firebaseArray(Ref.child('devfest2016').child('speakers'));
	$scope.err = null;

	$scope.sessions = [];
	
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	if($stateParams.speakerId === 'new') {
		$scope.editMode = true;
		$scope.speaker = {};
	} else if($stateParams.speakerId && $stateParams.speakerId.length > 0) {
		$scope.speaker = $firebaseObject(Ref.child('devfest2016/speakers').child($stateParams.speakerId));
	} else {
		console.log('Leaving the page because we could not find a speaker ID.');
		$scope.cancel();
		return;
	}   

	// let's figure out which sessions they are a part of
	var scheduleRef = Ref.child('devfest2016/schedule');
	scheduleRef.on('child_added', function(snapshot) {
		
		
		if(snapshot.val().speakers) {
			for (var key in snapshot.val().speakers) {
				if($stateParams.speakerId === snapshot.val().speakers[key]) {
					$scope.sessions.push($firebaseObject(scheduleRef.child(snapshot.key())));
				}
			}
		}
	});


	
	// A user has hit the save button. 
	// Let's go get the image they uploaded if they have one, and save or add
	// this speaker to the firebaseArray.
	$scope.saveSpeaker = function() {
		var speaker = $scope.speaker;
		
		if ($scope.imageData) {
			speaker.image = $scope.imageData;
		}
		var imageData;
		if(speaker.image && speaker.image !== true) {
			imageData = speaker.image;
			speaker.image = true;
			console.log('Removing speaker image while saving');
		}

		var speakerPromise;
		if (speaker && speaker.$id) {
			speakerPromise = speaker.$save();
			} else if (speaker) {
			speakerPromise = $scope.speakers.$add(speaker);
		} else {
			$scope.err = 'Please fill out the form or click Cancel to close.';
			return;
		}

		if(speaker.image && imageData) {
			// Now migrate the image into separate data source based on the ID of the speaker
			speakerPromise.then(function(ref) {
				var id = ref.key();
				var imageRef = Ref.child('/images/devfest2016/speakers/' + id);
				imageRef.set(imageData);
			});
		}

		$modalInstance.close();
	};

	// If the user uploads an image, store the payload
	$scope.$watch('speakerForm', function() {
		document.getElementById('image').addEventListener('change', $scope.handleImageAdd, false);
	}, true);

	// Store Image Upload payload as $scope.imageData
	$scope.handleImageAdd = function(evt) {
		var f = evt.target.files[0];
		var reader = new FileReader();
		reader.onload = (function() {
			return function(e) {
				var filePayload = e.target.result;
				$scope.imageData = filePayload;
			};
		})(f);
		reader.readAsDataURL(f);
	};

	$scope.deleteSpeaker = function() {
		var speaker = $scope.speaker;
		if (window.confirm('Are you sure you want to delete this speaker?')) {
			
			console.log('Deleting speaker with ID ', speaker.$id);
			speaker.$remove();
			$modalInstance.close();
		}
    };

    $scope.socialLink = function(network, profile) {
    	var link = '';

    	switch(network) {
    		case 'google_plus':
    		link = 'https://plus.google.com/' + profile;
    		break;
    		case 'facebook':
    		link = 'https://www.facebook.com/' + profile;
    		break;
    		case 'twitter':
    		link = 'https://twitter.com/' + profile;
    		break;
    		case 'github':
    		link = 'https://github.com/' + profile;
    		break;
    	}

    	$window.open(link, '_blank');
    	return false;
    };

    $scope.viewSession = function(id) {
		$modalInstance.dismiss({action:'sessionForward',id:id});
    }
});