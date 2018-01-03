var applicationController = ['$scope', 'settingsService', function ($scope, settingsService) { // jshint ignore:line
  $scope.app = {
    name: settingsService.applicationName,
    icon: settingsService.applicationIcon
  };
}];