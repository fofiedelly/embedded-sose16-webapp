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

  var fillupRoom = function(room) {
    vm.room = room;
    vm.room.displayname = vm.room.name ? vm.room.name : vm.room.roomId;
  }

  vm.updateName = function() {
    $http.patch(AppSettings.apiUrl + '/api/rooms/' + id, {
      name: vm.room.name
    }).success(function(result, status, headers) {
      // vm.room = result;
      fillupRoom(result);
    });
  }

  vm.getRoom = function() {
    $http.get(AppSettings.apiUrl + '/api/rooms/' + id).success(function(result, status, headers) {
      // vm.room = result;
      fillupRoom(result);
    });
  }
  vm.getRoom();
  vm.getDevices();
}

export default {
  name: 'RoomCtrl',
  fn: RoomCtrl
};
