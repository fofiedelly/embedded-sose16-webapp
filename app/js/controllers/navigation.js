function NavigationCtrl(AppSettings, $location, TokenStorage, $rootScope, $http, SecurityService, $scope, $stomp, toasty) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.brand = AppSettings.appTitle;
  vm.user = null;

  SecurityService.getUser().then(user => {
    $scope.$apply(function() {

      // if (user && (!vm.user || user.username != vm.user.username)) {
      //   $stomp
      //     .connect(AppSettings.apiUrl + '/backend').then(function(frame) {
      //       console.log('connection established to backend with ' + user.username)
      //
      //       var subscription = $stomp.subscribe('/' + user.username, function(payload, headers, res) {
      //         $scope.$apply(function() {
      //           toasty.info({
      //             title: payload.title,
      //             msg: payload.message
      //           });
      //
      //         })
      //       })
      //
      //     }).catch(function(err) {
      //       console.log(err);
      //     })
      // }


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
