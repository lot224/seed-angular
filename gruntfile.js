
module.exports = function (grunt) {

  var vendor = {
    js: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/bootstrap/dist/js/bootstrap.js'
    ],
    css: [],
    files: [
      { cwd: 'node_modules/bootstrap/dist/fonts', src: '**/*.*', dest: 'web/public/css/fonts', expand: true }
    ]
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      all: ['web/public']
    },
    compass: {
      all: {
        options: {
          sassDir: 'web/assets/scss',
          cssDir: 'web/public/css',
          imagesDir: 'web/public/css',
          outputStyle: 'compressed',
          noLineComments: true,
        }
      }
    },
    copy: {
      all: {
        files: [
          {
            expand: true,
            flatten: true,
            src: vendor.js,
            dest: 'web/public/js'
          }
        ]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('creatingVendors', 'builds the public folder and moves the js framework files', function (force) {

    /* 
     * Because this is not a quick task, if the public folder exists we will not build the vendor related files.
     * A call to grunt clean will purge the public folder and allow a rebuild
     */
    if (grunt.file.exists("web/public") && force !== true) {
      console.log("Public folder exists, skipping task creatingVendors.");
      console.log("  Delete Public folder if you have added any new vendors.");
      //return;
    }

    var config = {
      dev: {
        options: {
          banner: "(function(window, undefined) {'use strict';\n\n",
          footer: "\n\n})(window);",
          mangle: false,
          beautify: true,
          sourceMap: true,
        },
        files: [{
          src: vendor.js,
          dest: 'web/public/js/vendor.js'
        }]
      },
      prod: {
        options: {
          banner: "(function(window, undefined) {'use strict';\n\n",
          footer: "\n\n})(window);",
          mangle: true,
          beautify: false,
          sourceMap: true,
          compress: {
            drop_console: true // <-
          }
        },
        files: [{
          src: vendor.js,
          dest: 'web/public/js/vendor.min.js'
        }]
      },
      css: {
        src: vendor.css,
        dest: 'web/public/css/vendor.css'
      }
    };

    grunt.config('uglify.vendorsDev', config.dev);
    grunt.config('uglify.vendorsProd', config.prod);
    grunt.config('concat.vendors', config.css);
    grunt.config('copy.vendors', { files: vendor.files });

    grunt.task.run(['uglify:vendorsDev', 'uglify:vendorsProd', 'concat:vendors', 'copy:vendors']);


  });

  grunt.registerTask('compileComponent', 'compiles the angular components', function (component) {
    component = component || 'all';
    var path = 'web/assets/components/';

    var components = grunt.file.expand({ filter: 'isDirectory', cwd: path }, '*');

    for (var i = 0; i < components.length; i++) {
      var name = components[i];
      if (name === component || 'all' === component) {

        var files = grunt.file.expand({ filter: 'isFile', cwd: path + name }, '*.js');
        var templates = grunt.file.expand({ filter: 'isFile', cwd: path + name }, '*.html');

        console.log("COMPONENT: ", name, "FILES: ", files, "TEMPLATES: ", templates);
      }
    }

  });

  // Default task(s).
  grunt.registerTask('default', ['creatingVendors', 'compass']);
  
};