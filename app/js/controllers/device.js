function DeviceCtrl($stateParams, $http, AppSettings) {
  'ngInject';

  // ViewModel
  const vm = this;
  var roomId = $stateParams.roomId;
  var deviceId = $stateParams.deviceId;
  vm.device = {};
  vm.currentTemp = 20;

  vm.getDevice = function() {
    $http.get(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId).success(function(result, status, headers) {
      vm.device = result;
      console.log(vm.devices);
    });
  }

  vm.getRoom = function() {
    $http.get(AppSettings.apiUrl + '/api/rooms/' + roomId).success(function(result, status, headers) {
      vm.room = result;
      console.log(vm.room);
    });
  }

  vm.sendTemp = function(value) {
    $http.post(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId + '/command', {
      type: 'SET',
      value: value
    }).success(function(result, status, headers) {
      console.log(result);
      
    });
  }

  vm.getRoom();
  vm.getDevice();
}

export default {
  name: 'DeviceCtrl',
  fn: DeviceCtrl
};
