function SecurityService($http, AppSettings) {
  'ngInject';

  const service = {};
  var user;

  service.getUser = function() {

    return new Promise((resolve, reject) => {
      if (user) {
        resolve(user);
      } else {
        $http.get(AppSettings.apiUrl + '/api/users/current').success((data) => {
          user = data;
          resolve(data);
        }).error((err, status) => {
          reject(err, status);
        });
      }
    });
  };

  return service;

}

export default {
  name: 'SecurityService',
  fn: SecurityService
};
