function SwitchCtrl($stateParams, $http, AppSettings, $timeout, toasty, $stomp, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;
  vm.device = $stateParams.device;
  var roomId = $stateParams.roomId;
  var deviceId = $stateParams.deviceId;
  vm.enabled = vm.device.targetValue == 1;
  var timerPromise;

  vm.updateValue = function() {
    if (timerPromise) {
      $timeout.cancel(timerPromise);
    }
    timerPromise = $timeout(checkResponse, 2000);
    $http.patch(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId, {
      targetValue: vm.enabled ? 1 : 2
    }).success(function(result, status, headers) {
      console.log(result.targetValue);



    });
  }


  var checkResponse = function() {
    if (vm.device.targetValueOnDevice != vm.device.targetValue) {
      toasty.error({
        title: "Device offline",
        msg: "Device " + vm.device.name + " could not be reached!"
      });
    }else{
      toasty.success({
        title: "Value changed",
        msg: "Value on device " + vm.device.name + " changed!"
      });
    }
  }

  $stomp
    .connect(AppSettings.apiUrl + '/backend').then(function(frame) {
      console.log('connection established to backend!')

      var subscription = $stomp.subscribe('/rooms/' + roomId + '/devices/' + deviceId, function(payload, headers, res) {
        $scope.$apply(function() {
          console.log(payload);
          fillupDevice(payload);
        })
      })

    }).catch(function(err) {
      console.log(err);
    })

}

export default {
  name: 'SwitchCtrl',
  fn: SwitchCtrl
};
