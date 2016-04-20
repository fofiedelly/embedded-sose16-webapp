function TokenAuthInterceptorService($q, TokenStorage) {
  'ngInject';

  const service = {};

  service.request = function(config) {
    var authToken = TokenStorage.retrieve();
    if (authToken) {
      config.headers['X-AUTH-TOKEN'] = authToken;
    }
    return config;
  };

  service.responseError = function(error) {
    if (error.status === 401 || error.status === 403) {
      TokenStorage.clear();
    }
    return $q.reject(error);
  };

  return service;
}

export default {
  name: 'TokenAuthInterceptor',
  fn: TokenAuthInterceptorService
};
