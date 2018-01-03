/* jshint ignore:start */

var module = angular.module('app.init', ['ngAnimate', 'ngSanitize', 'templates'])
  .controller('applicationController', applicationController)
  .controller('homeController', homeController)
  .provider('settingsService', settingsProvider)
  .config(applicationConfig)
  .run([function () { }]);

/* jshint ignore:end */