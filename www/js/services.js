angular.module('app.services', ['ngResource', 'ngStorage']).

constant('ApiEndpoint', {
  // url : '/api/sisoweb' for web testing, and real url for mobile testing
  url : '/api/sisoweb' //"http://localhost:8100" //mine "https://nameless-island-29757.herokuapp.com"   //app https://lit-basin-60588.herokuapp.com/api/sisoweb
})

.factory('Locations', [function(){
//  $localStorage = $localStorage.$default({
  //  userData : {pin: "", name: "", manager: "", contact: ""}
//  });

  var getLocations = function () {
    return ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5', 'Location 6'];
  };

  return {
    get : getLocations
  };
}])

.factory('SISOFactory', ['$localStorage', function($localStorage){
  $localStorage = $localStorage.$default({
    userData : {pin: "", name: "", manager: "", contact: ""}
  });

  var saveUser = function (user) {
    $localStorage.userData = user;
  };

  var getUser = function () {
    return $localStorage.userData;
  };

  return {
    set : saveUser,
    get : getUser
  };
}])

.factory('ProfileFactory', ['$localStorage', function($localStorage){

  $localStorage = $localStorage.$default({
    profileData : {}
  });

  var saveProfile = function (user) {
    $localStorage.profileData = user;
    console.log("--Service.save--"+$localStorage.profileData+"--");

  };

  var getProfile = function () {
    return $localStorage.profileData;
  };

  var isEmptyObj = function(){
    return Object.keys($localStorage.profileData).length === 0 && $localStorage.profileData.constructor === Object;
  };

  var resetObj = function(){
    console.log("--inside resetObj--");
    var userData = {};
    saveProfile(userData)
  //  });
  };

  return {
    set : saveProfile,
    get : getProfile,
    reset: resetObj,
    isEmpty: isEmptyObj
  };

}])

.service('SISOService', ['$resource', 'ApiEndpoint', function($resource, ApiEndpoint){
  console.log('EndPoint:', ApiEndpoint.url);

  return $resource('', {}, {
    save : {method: 'POST', url : ApiEndpoint.url + '/siso', cache: false, responseType: 'json'},
    get : {method: 'GET', url: ApiEndpoint.url + '/siso/:pin/status/:status', params: {pin : '@pin', status: '@status'}, cache: false, responseType : 'json' },
    update : {method: 'PUT', url: ApiEndpoint.url + '/siso/id/:id', params: {id:'@_id'},responseType: 'json'},
    list : {method: 'GET', url: ApiEndpoint.url + '/siso/list/:pin', params: {pin:'@pin'}, responseType: 'json'},
    getUserByPIN : {method: 'GET', url: ApiEndpoint.url + '/siso/user/:pin', params: {pin:'@pin'}, responseType: 'json'},
    getUserByUsername : {
      method: 'GET',
      url: ApiEndpoint.url + '/siso/user/username/:username/passw/:password',
      params: {
        username:'@username',
        passw: '@password'
      },
      responseType: 'json'},
    saveUser : {method: 'POST', url: ApiEndpoint.url + '/siso/user', cache: false, responseType: 'json'}
  });
}])

.service('SISOSprints', ['$resource', 'ApiEndpoint', function($resource, ApiEndpoint){
  return $resource('', {},{
    get : {method: 'GET', url: ApiEndpoint.url, cache: false, params: {fname:'@fname', lname: '@lname'}, responseType: 'json', isArray:true},
    post : {method: 'POST', url: ApiEndpoint.url, cache: false, responseType: 'json'},
    delete: {method: 'DELETE', url: ApiEndpoint.url + '/:id', params: {id:'@_id'} ,cache: false, responseType: 'json'}
  });
}]);
