// jshint ignore:start

angular.module("application", ["global", "application.templates"])
  .controller("applicationController", applicationController)
  .controller("homeController", homeController)
  .controller("aboutController", aboutController)
  .directive("navigation", navigationDirective)
  .config(applicationConfig)
  .run(applicationRun);

// jshint ignore:end