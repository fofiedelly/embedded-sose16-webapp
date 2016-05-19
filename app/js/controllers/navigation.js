function NavigationCtrl(AppSettings, $location, TokenStorage, $rootScope, $http, SecurityService, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.brand = AppSettings.appTitle;

  SecurityService.getUser().then(user => {
    $scope.$apply(function() {
      vm.user = user;
    });
  });

  vm.logout = function() {
    // Just clear the local storage
    SecurityService.logout().then(() => {
      $scope.$apply(function() {
        $rootScope.authenticated = false;
        $location.path('/login');
      });
    });

  };

  vm.authenticated = function() {
    return TokenStorage.retrieve();
  }


}



export default {
  name: 'NavigationCtrl',
  fn: NavigationCtrl

};
