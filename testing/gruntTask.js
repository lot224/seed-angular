// all paths are relative to the parent gruntfile.js folder

module.exports = function (grunt) {

  

  grunt.config('karma', {
    unit: {
      options: {
        basePath: '',
        files: [
          "web/public/js/vendor.js",
          "web/public/js/global.js",
          "web/public/js/application.templates.js",
          "web/public/js/application.js",

          "node_modules/angular-mocks/angular-mocks.js",

          "sandbox/assets/js/dataset.js",

          'testing/tests/**/*.js'
        ],
        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        captureTimeout: 60000,
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
};