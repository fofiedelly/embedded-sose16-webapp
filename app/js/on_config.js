function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('Home', {
    url: '/',
    views: {
      'content': {
        controller: 'ExampleCtrl as home',
        templateUrl: 'home.html'
      },
      'navigation': {
        controller: 'NavigationCtrl as navigation',
        templateUrl: 'navigation.html'
      }
    },
    title: 'Home'


  }).state('Rooms', {
    url: '/',
    views: {
      'content': {
        controller: 'RoomsCtrl as rooms',
        templateUrl: 'rooms.html'
      },
      'navigation': {
        controller: 'NavigationCtrl as navigation',
        templateUrl: 'navigation.html'
      }
    },
    title: 'Home'


  }).state('Login', {
      url: '/login',
      views: {
        'content': {
          controller: 'LoginCtrl as login',
          templateUrl: 'login.html'
        }
      },
      title: 'Login'


    }).state('Register', {
        url: '/register',
        views: {
          'content': {
            controller: 'RegisterCtrl as register',
            templateUrl: 'register.html'
          }
        },
        title: 'Register'
      });

  $urlRouterProvider.otherwise('/');



  $httpProvider.interceptors.push('TokenAuthInterceptor');

}

export default OnConfig;
