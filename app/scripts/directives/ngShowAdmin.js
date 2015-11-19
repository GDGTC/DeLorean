/**
 * @ngdoc function
 * @name devfestApp.directive:ngShowAuth
 * @description
 * # ngShowAuthDirective
 * A directive that shows elements only when user is logged in. It also waits for Auth
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('devfestApp')
  .directive('ngShowAdmin', ['Auth', 'Ref', '$firebaseObject', '$timeout', function (Auth, Ref, $firebaseObject, $timeout) {
    'use strict';

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it
        function update() {

          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            var user = Auth.$getAuth();
            var isAdmin = false;
            el.toggleClass('ng-cloak', !isAdmin);
            // console.log(user);
            if(user){
              var inAdmin = new $firebaseObject(Ref.child("admin/"+user.uid));
              // console.log('admin object');
              // console.log(inAdmin);
              inAdmin.$loaded().then(function(){
                if(inAdmin.$value){ 
                  isAdmin = true;
                  // console.log("ADMIN ADMIN ADMIN");
                  // console.log('isAdmin: '+isAdmin);
                  el.toggleClass('ng-cloak', !isAdmin);
                }
              });
            }
          }, 0);
        }

        Auth.$onAuth(update);
        update();
      }
    };
  }]);
