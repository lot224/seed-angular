angular.module("about", ["global","application"])
  .controller("aboutController", aboutController)
  .config(aboutConfig)
  .run(aboutRun)

console.log('loaded about module', angular);