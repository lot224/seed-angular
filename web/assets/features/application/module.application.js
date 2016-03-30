angular.module("application", ["global","application.templates"])
  .controller("applicationController", applicationController)
  .config(applicationConfig)
  .run(applicationRun);
