function HeatingCtrl($http, AppSettings, $stateParams) {
  'ngInject';

  // ViewModel
  const vm = this;
  vm.device = $stateParams.device;
  var roomId = $stateParams.roomId;
  var deviceId = $stateParams.deviceId;

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

  vm.sendTemp = function() {
    $http.patch(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId, {
      targetValue: vm.device.targetValue
    }).success(function(result, status, headers) {
      fillupDevice(result);
    });
  }

  var fillupDevice = function(device) {
    vm.device = device;
    vm.device.displayname = vm.device.name ? vm.device.name : vm.device.deviceId;
  }


}

export default {
  name: 'HeatingCtrl',
  fn: HeatingCtrl
};
