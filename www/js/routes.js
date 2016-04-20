angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tab',{
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tab.checkInCheckOut', {
    url: '/entries',
    views:{
      'tab-checkInCheckOut':
      {
        templateUrl: 'templates/checkInCheckOut.html',
        controller: 'checkInCheckOutCtrl'
      }
    }
  })

  .state('tab.userInfo', {
    url: '/userInfo',
      views:{
        'tab-checkInCheckOut':
        {
          templateUrl: 'templates/userInfo.html',
          controller: 'userInfoCtrl'
        }
    }
  })

  .state('tab.log', {
    url: '/log',
    views:{
      'tab-checkInCheckOut':
      {
        templateUrl: 'templates/log.html',
        controller: 'logCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')



});
