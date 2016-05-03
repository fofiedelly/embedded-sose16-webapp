function RoomCtrl($stateParams, $http, AppSettings) {
  'ngInject';

  // ViewModel
  const vm = this;
  var id = $stateParams.roomId;
  vm.devices = [];
  vm.room = {};

  vm.getDevices = function() {
    $http.get(AppSettings.apiUrl + '/api/rooms/' + id + '/devices').success(function(result, status, headers) {
      vm.devices = result;
      console.log(vm.devices);
    });
  }

  vm.getRoom = function() {
    $http.get(AppSettings.apiUrl + '/api/rooms/' + id).success(function(result, status, headers) {
      vm.room = result;
      console.log(vm.room);
    });
  }
  vm.getRoom();
  vm.getDevices();
}

export default {
  name: 'RoomCtrl',
  fn: RoomCtrl
};
