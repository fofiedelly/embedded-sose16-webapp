function HeatingCtrl($http, AppSettings, $stateParams, $timeout, toasty, $stomp, $scope, $rootScope, $interval) {
  'ngInject';

  var _ = require('lodash')
  require('lodash-math');

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


  vm.labels = []
  vm.data = []

  let getTimestamps = function() {
    $http.get(AppSettings.apiUrl + '/api/rooms/' + roomId + '/devices/' + deviceId + '/timestamps').success(function(result, status, headers) {

      let now = new Date()
      let limitHour = now.getHours() - 10

      let timeRange = _.chain(_.range(limitHour, now.getHours() + 1))
        .map(v => [{
          h: v,
          m: 0
        }, {
          h: v,
          m: 15
        }, {
          h: v,
          m: 30
        }, {
          h: v,
          m: 45
        }])
        .flattenDeep()
        .takeWhile(x => x.h < now.getHours() || (x.h == now.getHours() && x.m < now.getMinutes()))
        .takeRight(AppSettings.tempCurvNumberOfTimestamps)
        .value();

      vm.labels = _.map(timeRange, x => x.m == 0 ? x.h + ':00' : x.h + ':' + x.m)

      let valuesOfTimeRange = (x, property) => {
        return _.chain(result)
          .map(t => {
            return {
              hour: (new Date(t.timestamp)).getHours(),
              minute: (_.floor((new Date(t.timestamp)).getMinutes() / 15)) * 15,
              value: _.get(t, property)
            }
          })
          .filter(t => t.hour == x.h && t.minute == x.m)
          .map(t => t.value)
          .value()
      }


      let meanOfTimeRange = (x, property) => {
        let values = valuesOfTimeRange(x, property)
        return values.length > 0 ? _.ceil(_.mean(values), 1) : 0
      }

      let modeOfTimeRange = (x, property) => {
        let values = valuesOfTimeRange(x, property)
        return values.length > 0 ? _.mode(values) : 0
      }



      vm.data = [_.map(timeRange, x => meanOfTimeRange(x, 'value')), _.map(timeRange, x => modeOfTimeRange(x, 'targetValue'))]

    });
  }
  getTimestamps()
  $interval(getTimestamps, 10000)

  // vm.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  vm.options = {
    datasetStrokeWidth: 3,
    // scaleOverride: true,
    // scaleBeginAtZero: true,
    //  pointDotStrokeWidth: 10
    pointDotRadius: 5,
    scaleStepWidth: 1,
    scaleStartValue: 18,
    scaleSteps: 17,
    animation: true,
    showXLabels: 4,
    // bezierCurve: false

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
    timerPromise = $timeout(checkResponse, 4500);
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

      // var userSubscription = $stomp.subscribe('/' + $rootScope.user.username, function(payload, headers, res) {
      //   $scope.$apply(function() {
      //     toasty.info({
      //       title: payload.title,
      //       msg: payload.message
      //     });
      //
      //   })
      // })

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
