function TokenStorageService() {

  const service = {};

  var storageKey = 'auth_token';

  service.store = function(token) {
    return localStorage.setItem(storageKey, token);
  };
  service.retrieve = function() {
    return localStorage.getItem(storageKey);
  };
  service.clear = function() {
    return localStorage.removeItem(storageKey);
  };

  return service;

}

export default {
  name: 'TokenStorage',
  fn: TokenStorageService
};
