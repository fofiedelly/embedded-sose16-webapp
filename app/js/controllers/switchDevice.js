function SwitchCtrl($stateParams, $http, AppSettings, $timeout) {
  'ngInject';

  // ViewModel
  const vm = this;
  vm.device = $stateParams.device;
  var roomId = $stateParams.roomId;
  var deviceId = $stateParams.deviceId;
  vm.enabled = vm.device.targetValue == 1;

  vm.updateValue = function() {
    $http.patch(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId, {
      targetValue: vm.enabled ? 1 : 2
    }).success(function(result, status, headers) {
      console.log(result.targetValue);

    });
  }


}

export default {
  name: 'SwitchCtrl',
  fn: SwitchCtrl
};
