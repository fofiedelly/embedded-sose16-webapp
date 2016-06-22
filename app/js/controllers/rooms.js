function RoomsCtrl($http, AppSettings, $stomp, $scope, $rootScope, toasty) {
  'ngInject';

  // ViewModel
  const vm = this;
  vm.rooms = [];

  vm.getRooms = function() {
    $http.get(AppSettings.apiUrl + '/api/rooms').success(function(result, status, headers) {
      vm.rooms = result;
      console.log(vm.rooms);
    });
  }

  $stomp
    .connect(AppSettings.apiUrl + '/backend').then(function(frame) {
      console.log('connection established to backend')

      var subscription = $stomp.subscribe('/rooms', function(payload, headers, res) {
        $scope.$apply(function() {
          vm.rooms.push(payload);
        })
      })

      var userSubscription = $stomp.subscribe('/' + $rootScope.user.username, function(payload, headers, res) {
        console.log('new message');
        $scope.$apply(function() {
          toasty.info({
            title: payload.title,
            msg: payload.message
          });

        })
      })

    }).catch(function(err) {
      console.log(err);
    })

  vm.getRooms();



}

export default {
  name: 'RoomsCtrl',
  fn: RoomsCtrl
};
