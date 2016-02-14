'use strict';

angular.module('devfestApp')
.factory('Rooms', function(){
	var Rooms = {
		// These room names determine the columns of the main schedule
		namedRoomList: {
			'auditorium':'Main Auditorium',
			'smallauditorium': 'Small Auditorium',
			'lab': 'Laboratory Classroom (3rd Floor)',
			'classroom1': 'Classroom A (3rd Floor)',
			'classroom2': 'Classroom B (3rd Floor)',
			'classroom3': 'Classroom C (3rd Floor)',
		}
	};
	return Rooms;
});