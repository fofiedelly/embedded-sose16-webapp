function NavigationCtrl(AppSettings, $location, TokenStorage, $rootScope) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.brand = AppSettings.appTitle;

  vm.logout = function() {
    // Just clear the local storage
    TokenStorage.clear();
    $rootScope.authenticated = false;
    $location.path('/login');
  };

  vm.authenticated = function(){
    return TokenStorage.retrieve();
  }

}



export default {
  name: 'NavigationCtrl',
  fn: NavigationCtrl

};
