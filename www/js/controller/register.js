angular.module('app.register', ['ionic-modal-select'])



  .controller('registerCtrl', ['$scope', '$interval', '$location',
    'SISOSprints', 'Locations', 'ProfileFactory', '$ionicLoading', '$ionicModal', '$ionicPopup', 'Managers', '$stateParams', '$ionicNavBarDelegate',
    function ($scope, $interval, $location,
              SISOSprints, Locations, ProfileFactory, $ionicLoading, $ionicModal, $ionicPopup, Managers, $stateParams, $ionicNavBarDelegate) {


      $scope.user = {fname: '', lname: ''};
      $scope.locations = Locations.get();
      $scope.dialog = {title: 'Login Page', buttonLabel: 'Login'};
      $scope.someModel = null;
      $scope.managers = [];

      $scope.cancelBtn = false;

      $scope.record = {
        "fname": "",
        "mname": "",
        "lname": "",
        "managerProfile": {},
        "mfname": "",
        "mlname": "",
        "contact": "",
        "location": "",
        "manager": ""
      };

      $scope.$on('$ionicView.beforeEnter', function () {
        SISOSprints.getManagerList({}, function (mgrs) {
          $scope.managers =mgrs;
        }, function(error) {
          var confirmPopup = $ionicPopup.alert({
            title: '<b>Sign Out Error</b>',
            template: error.status+', '+error.statusText

          });
        });


        if ($stateParams.mode === 'home' && !ProfileFactory.isEmpty()) {
          $location.path('/tab/signInSignOut');
        } else {
          if ($stateParams.mode === 'edit') {
            $scope.cancelBtn = true;
            $ionicNavBarDelegate.title('');
          } else {
            $scope.cancelBtn = false;
          }
          var profileData = ProfileFactory.get();
          Object.keys(profileData).forEach(function (key) {
            $scope.record[key] = profileData[key];
          });
        }

      });

      $scope.ph_numbr = /^(\+?(\d{1}|\d{2}|\d{3})[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{4}$/;

      $scope.save = function () {
        var profileData = {};

        Object.keys($scope.record).forEach(function (key) {
          profileData[key] = $scope.record[key];

          if(key === 'mfname') {
            profileData[key] = $scope.record['managerProfile'].fname;
          } else
          if(key === 'mlname') {
           profileData[key] = $scope.record['managerProfile'].lname;
          }
        });

        ProfileFactory.set(profileData);
        $ionicLoading.show({template: 'Registered!', noBackdrop: true, duration: 2200});
        $location.path('/tab/signInSignOut');
      };


      $scope.cancel = function () {
        $location.path('/tab/signInSignOut');
      };


    }]);
