angular.module('firebase.config', [])
  .constant('FBURL', 'https://devfestmn.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','google'])
  .constant('loginRedirectPath', '/login');