function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
    // .state('Home', {
    //   url: '/',
    //   views: {
    //     'content': {
    //       controller: 'ExampleCtrl as home',
    //       templateUrl: 'home.html'
    //     },
    //     'navigation': {
    //       controller: 'NavigationCtrl as navigation',
    //       templateUrl: 'navigation.html'
    //     }
    //   },
    //   ncyBreadcrumb: {
    //     skip: true
    //   },
    //   title: 'Home'
    //
    //
    // })
    .state('Rooms', {
      url: '/rooms',
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


    }).state('Rooms.Room', {
      url: '/:roomId',
      views: {
        'content@': {
          controller: 'RoomCtrl as ctrl',
          templateUrl: 'room.html'
        },
        'navigation@': {
          controller: 'NavigationCtrl as navigation',
          templateUrl: 'navigation.html'
        }
      },
      ncyBreadcrumb: {
        label: '{{ ctrl.room.displayname }}'
      },
      title: 'Home'


    }).state('Rooms.Room.device', {
      url: '/device/:deviceId',
      views: {
        'content@': {
          controller: 'DeviceCtrl as ctrl',
          templateUrl: 'device.html'
        },
        'navigation@': {
          controller: 'NavigationCtrl as navigation',
          templateUrl: 'navigation.html'
        }
      },
      ncyBreadcrumb: {
        label: '{{ ctrl.device.displayname }}'
      },
      title: 'Home'


    }).state('Rooms.Room.device.HEATING', {
      url: '/heating',
      params: {
        'device': null
      },
      views: {
        'device': {
          controller: 'HeatingCtrl as heatingCtrl',
          templateUrl: 'heatingDevice.html',
          resolve: {
            name: ['$stateParams', function($stateParams) {
              return $stateParams.device;
            }]
          }
        }
      },
      ncyBreadcrumb: {
        skip: true
      },
      title: 'Home'


    }).state('Rooms.Room.device.SWITCH', {
      url: '/switch',
      params: {
        'device': null
      },
      views: {
        'device': {
          controller: 'SwitchCtrl as switchCtrl',
          templateUrl: 'switchDevice.html',
          resolve: {
            name: ['$stateParams', function($stateParams) {
              return $stateParams.device;
            }]
          }
        }
      },
      ncyBreadcrumb: {
        skip: true
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
      ncyBreadcrumb: {
        skip: true
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
      ncyBreadcrumb: {
        skip: true
      },
      title: 'Register'
    });

  $urlRouterProvider.otherwise('/rooms');

  $httpProvider.interceptors.push('TokenAuthInterceptor');

}

export default OnConfig;
