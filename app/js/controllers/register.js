function RegisterCtrl($http, $rootScope, $location, TokenStorage, AppSettings) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.register = function() {
    $http.post(AppSettings.apiUrl + '/api/users/add', {
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
  name: 'RegisterCtrl',
  fn: RegisterCtrl
};
