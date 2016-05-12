function DeviceCtrl($stateParams, $http, AppSettings, $stomp, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;
  var roomId = $stateParams.roomId;
  var deviceId = $stateParams.deviceId;
  vm.value = 20;
  vm.device = {};

  var fillupDevice = function(device) {
    vm.device = device;
    vm.device.displayname = vm.device.name ? vm.device.name : vm.device.deviceId;
  }

  var fillupRoom = function(room) {
    vm.room = room;
    vm.room.displayname = vm.room.name ? vm.room.name : vm.room.roomId;
  }

  vm.getDevice = function() {
    $http.get(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId).success(function(result, status, headers) {
      fillupDevice(result);
    });
  }

  vm.getRoom = function() {
    $http.get(AppSettings.apiUrl + '/api/rooms/' + roomId).success(function(result, status, headers) {
      fillupRoom(result);
    });
  }

  vm.sendValue = function() {
    $http.patch(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId, {
      targetValue: vm.device.targetValue
    }).success(function(result, status, headers) {
      fillupDevice(result);
    });
  }

  vm.updateName = function() {
    $http.patch(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId, {
      name: vm.device.name
    }).success(function(result, status, headers) {
      fillupDevice(result);
    });
  }

  $stomp
    .connect(AppSettings.apiUrl + '/backend').then(function(frame) {
      console.log('connection established to backend!')

      var subscription = $stomp.subscribe('/rooms/' + roomId + '/devices/' + deviceId, function(payload, headers, res) {
        $scope.$apply(function() {
          fillupDevice(payload);
        })
      })

    }).catch(function(err) {
      console.log(err);
    })


  vm.getRoom();
  vm.getDevice();

}

export default {
  name: 'DeviceCtrl',
  fn: DeviceCtrl
};
