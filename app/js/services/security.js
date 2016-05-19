function SecurityService($http, AppSettings, TokenStorage, $rootScope) {
  'ngInject';

  const service = {};
  // var user;

  service.getUser = function() {

    return new Promise((resolve, reject) => {
      if ($rootScope.user) {
        resolve($rootScope.user);
      } else {
        $http.get(AppSettings.apiUrl + '/api/users/current').success((data) => {
          $rootScope.user = data;
          resolve(data);
        }).error((err, status) => {
          reject(err, status);
        });
      }
    });
  };

  service.logout = function() {
    return new Promise((resolve, reject) => {
      TokenStorage.clear();
      $rootScope.user = null;
      resolve();
    });
  };

  service.login = function(username, password) {
    return new Promise((resolve, reject) => {
      $http.post(AppSettings.apiUrl + '/api/login', {
        username: username,
        password: password
      }).success((data, status, headers) => {
        service.getUser().then((u) => {
          $rootScope.user = u;
          TokenStorage.store(headers('X-AUTH-TOKEN'));
          resolve(u);
        })

      }).error((err, status) => {
        $rootScope.user = null;
        reject(err, status);
      });
    });
  };


  return service;

}

export default {
  name: 'SecurityService',
  fn: SecurityService
};
