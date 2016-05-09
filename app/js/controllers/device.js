function DeviceCtrl($stateParams, $http, AppSettings, $stomp, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;
  var roomId = $stateParams.roomId;
  var deviceId = $stateParams.deviceId;
  vm.device = {};
  vm.newTemp;


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

  vm.sendTemp = function() {
    $http.patch(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId, {
      targetValue: vm.newTemp
    }).success(function(result, status, headers) {
      vm.device = result;
      vm.newTemp = '';

    });
  }

  $stomp
    .connect(AppSettings.apiUrl + '/backend').then(function(frame) {
      console.log('connection established to backend!')

      var subscription = $stomp.subscribe('/rooms/' + roomId + '/devices/' + deviceId, function(payload, headers, res) {
        $scope.$apply(function() {
          vm.device = payload;
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
