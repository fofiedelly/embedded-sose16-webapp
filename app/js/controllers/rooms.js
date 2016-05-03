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



}

export default {
  name: 'RoomsCtrl',
  fn: RoomsCtrl
};
