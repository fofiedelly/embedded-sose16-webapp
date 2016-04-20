function RoomsCtrl($http, AppSettings) {
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

  vm.getRooms();

  vm.sendTemp = function(roomId, temp) {
    $http.post(AppSettings.apiUrl + '/command', {
      targetServer: roomId,
      targetDevice: 'heating',
      type: 'S',
      value: temp
    }).success(function(result, status, headers) {
      console.log(result);
    });
  }

}

export default {
  name: 'RoomsCtrl',
  fn: RoomsCtrl
};
