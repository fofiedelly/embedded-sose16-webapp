function LoginCtrl($http, TokenStorage, $rootScope, $location, AppSettings, SecurityService, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;
  $rootScope.authenticated = false;
  vm.token; // For display purposes only

  vm.init = function() {
    $http.get(AppSettings.apiUrl + '/api/users/current').success(function(user) {
      if (user.username !== 'anonymousUser') {
        vm.authenticated = true;
        vm.username = user.username;
        $rootScope.user = user;

      }
    });
  };

  vm.login = function() {
    SecurityService.login(vm.username, vm.password).then((user) => {
      $scope.$apply(function() {
        $location.path('/');
      })

    })




    // $http.post(AppSettings.apiUrl + '/api/login', {
    //   username: vm.username,
    //   password: vm.password
    // }).success(function(user, status, headers) {
    //   $rootScope.authenticated = true;
    //   $rootScope.user = user;
    //   TokenStorage.store(headers('X-AUTH-TOKEN'));
    //
    //   $location.path('/');
    // });
  };



  // vm.init();


}

export default {
  name: 'LoginCtrl',
  fn: LoginCtrl
};
