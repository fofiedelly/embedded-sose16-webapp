function LoginCtrl($http, TokenStorage, $rootScope, $location, AppSettings) {
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

        // For display purposes only
        vm.token = JSON.parse(atob(TokenStorage.retrieve().split('.')[0]));
      }
    });
  };

  vm.login = function() {
    $http.post(AppSettings.apiUrl + '/api/login', {
      username: vm.username,
      password: vm.password
    }).success(function(result, status, headers) {
      $rootScope.authenticated = true;
      TokenStorage.store(headers('X-AUTH-TOKEN'));

      // For display purposes only
      vm.token = JSON.parse(atob(TokenStorage.retrieve().split('.')[0]));
      console.log(vm.token);
      $location.path('/');
    });
  };



}

export default {
  name: 'LoginCtrl',
  fn: LoginCtrl
};
