/**
 * @ngdoc function
 * @name devfestApp.directive:ngShowAuth
 * @description
 * # ngShowAuthDirective
 * A directive that shows elements only when user is logged in. It also waits for Auth
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('devfestApp')
  .directive('ngShowAdmin', ['Auth', 'Ref', '$timeout', function (Auth, Ref, $timeout) {
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
            console.log(user);
            if(user){
              var inAdmin = Ref.child("admins/"+user.uid);
              console.log(inAdmin);
              if(inAdmin){ isAdmin = true;}
            }
            el.toggleClass('ng-cloak', !isAdmin);
          }, 0);
        }

        Auth.$onAuth(update);
        update();
      }
    };
  }]);
