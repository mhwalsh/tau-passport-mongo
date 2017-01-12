var myApp = angular.module('myApp', []);

myApp.controller('indexController',['$scope', '$http', function($scope, $http) {

  $scope.login = function() {
    console.log($scope.username, $scope.password);

    var toSend = {
      username: $scope.username,
      password: $scope.password
    };

    $http({
      method: 'POST',
      url: '/',
      data: toSend
    }).then(function(response) {
      console.log('login success');
    });
  };

}]);

myApp.controller('registerController',['$scope', '$http', function($scope, $http) {
  console.log('registerController');
  $scope.register = function() {
    console.log($scope.username, $scope.password);

    var toSend = {
      username: $scope.username,
      password: $scope.password
    };

    $http({
      method: 'POST',
      url: '/register',
      data: toSend
    }).then(function(response) {
      console.log('in client side success', response);
    });

  };
}]);
