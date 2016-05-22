function HeatingCtrl($http, AppSettings, $stateParams, $timeout, toasty, $stomp, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;
  vm.device = $stateParams.device;
  var roomId = $stateParams.roomId;
  var deviceId = $stateParams.deviceId;
  var timerPromise;

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

  var checkResponse = function() {
    console.log(vm.device.targetValueOnDevice);
    if (vm.device.targetValueOnDevice != vm.device.targetValue) {
      toasty.error({
        title: "Device offline",
        msg: "Device " + vm.device.name + " could not be reached!"
      });
    } else {
      toasty.success({
        title: "Value changed",
        msg: "Value on device " + vm.device.name + " changed!",
        shake: false
      });
    }
  }

  vm.sendTemp = function() {
    if (timerPromise) {
      $timeout.cancel(timerPromise);
    }
    timerPromise = $timeout(checkResponse, 2500);
    $http.patch(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId, {
      targetValue: vm.device.targetValue
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

  var fillupDevice = function(device) {
    vm.device = device;
    vm.device.displayname = vm.device.name ? vm.device.name : vm.device.deviceId;
  }


}

export default {
  name: 'HeatingCtrl',
  fn: HeatingCtrl
};
