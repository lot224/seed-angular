describe('The application module', function () {
  var template, $scope, controller;

  beforeEach(module("application"));

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    controller = $controller('homeController', { '$scope': $scope });
  }));

  it('should have a devTools object on $scope', function () {
    expect($scope.devTools).toNotEqual(null);
  });

  it('should have a resources object on $scope', function () {
    expect($scope.resources).toNotEqual(null);
  });

});