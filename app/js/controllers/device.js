function DeviceCtrl($stateParams, $http, AppSettings, $stomp, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;
  var roomId = $stateParams.roomId;
  var deviceId = $stateParams.deviceId;
  vm.value = 20;
  vm.device = {};

  vm.slider = {
    id: 'slider-id',
    value: 20,
    options: {
      floor: 15,
      showTicks: true,
      hideLimitLabels: false,
      onEnd: function(id) {
        vm.sendTemp()
      },
      ceil: 30,
      translate: function(value, sliderId, label) {
        return value + '°C'

      }
    }
  };

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
      // vm.device = result;
      fillupDevice(result);
      // vm.slider.options.showSelectionBarFromValue = vm.device.value;
    });
  }

  vm.getRoom = function() {
    $http.get(AppSettings.apiUrl + '/api/rooms/' + roomId).success(function(result, status, headers) {
      // vm.room = result;
      fillupRoom(result);
    });
  }

  vm.sendTemp = function() {
    $http.patch(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId, {
      targetValue: vm.device.targetValue
    }).success(function(result, status, headers) {
      // vm.device = result;
      fillupDevice(result);
    });
  }

  vm.updateName = function() {
    $http.patch(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId, {
      name: vm.device.name
    }).success(function(result, status, headers) {
      // vm.device = result;
      fillupDevice(result);
    });
  }

  $stomp
    .connect(AppSettings.apiUrl + '/backend').then(function(frame) {
      console.log('connection established to backend!')

      var subscription = $stomp.subscribe('/rooms/' + roomId + '/devices/' + deviceId, function(payload, headers, res) {
        $scope.$apply(function() {
          // vm.device = payload;
          fillupDevice(payload);
          // vm.slider.options.showSelectionBarFromValue = vm.device.value;
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
