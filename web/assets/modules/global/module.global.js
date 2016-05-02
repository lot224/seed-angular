// jshint ignore:start

angular.module("global", ["ngRoute", "ngAnimate", "ngSanitize"])
  .controller("globalController", globalController)
  .config(globalConfig)
  .run(globalRun)

// jshint ignore:end