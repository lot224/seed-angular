describe('The application module', function () {
  var template, $scope, controller;

  beforeEach(module("application"));

  beforeEach(inject(function ($templateCache, $rootScope, $compile, $controller) {
    template = $templateCache.get('about/template.about.htm');
    $scope = $rootScope.$new();
    $compile(template)($scope);
    $scope.$apply();

    controller = $controller('aboutController', { '$scope': $scope });
  }));

});