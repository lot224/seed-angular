
module.exports = function (grunt) {

  var assets = {
    vendor: {
      js: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular-sanitize/angular-sanitize.js',
        'node_modules/bootstrap/dist/js/bootstrap.js'
      ],
      files: [
        { cwd: 'node_modules/bootstrap/dist/fonts', src: '**/*.*', dest: 'web/public/css/fonts', expand: true }
      ],
    },
    global: {
      js: [
        'web/assets/modules/global/angular.overwrite.js',
        'web/assets/modules/global/factory.injector.js',
        'web/assets/modules/global/config.global.js',
        'web/assets/modules/global/run.global.js',
        'web/assets/modules/global/controller.global.js',
        'web/assets/modules/global/module.global.js',
      ]
    },
    application: {
      js: [
        'web/assets/modules/application/features/navigation/directive.navigation.js',
        'web/assets/modules/application/features/home/controller.home.js',
        'web/assets/modules/application/features/about/controller.about.js',

        'web/assets/modules/application/config.application.js',
        'web/assets/modules/application/run.application.js',
        'web/assets/modules/application/controller.application.js',
        'web/assets/modules/application/module.application.js'
      ],
      templates: [
        'home/template.home.htm',
        'about/template.about.htm',
        'navigation/template.navigation.htm'
      ]
    }
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
    watch: {
      css: {
        files: ['web/assets/scss/**/*.scss'],
        tasks: ['compass'],
        options: { spawn: false }
      }
    }
  });

  // Add watches for the javascript files, html files, and css files
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

  var setupWatches = function () {
    for (assetName in assets) {
      var asset = assets[assetName];

      // watch js files.
      if (asset.js) {
        grunt.config('watch.' + assetName + '_js', {
          files: asset.js,
          tasks: ['uglify:' + assetName, 'uglify:' + assetName + '-min'],
          options: { spawn: false }
        })
      };

      if (asset.templates) {
        grunt.config('watch.' + assetName + '_html', {
          files: asset.templates,
          tasks: ['ngtemplates:' + assetName],
          options: {
            cwd: {
              files: 'web/assets/modules/' + assetName + '/features',
            },
            spawn: false
          }
        })
      }
    }
  }

  grunt.registerTask('build', 'builds the assets', function (section) {

    var tasks = [];

    var sections = {};

    if (section != null) {
      if (assets[section] != null) {
        sections[section] = {};
      } else {
        console.log("Section '" + section + '" not found, ending...');
        return;
      }
    } else {
      sections = assets;
    }

    for (assetName in sections) {
      var asset = assets[assetName];

      if (asset['templates'] != null && asset['templates'].length > 0) {
        grunt.config('ngtemplates.' + assetName, {
          cwd: 'web/assets/modules/' + assetName + '/features',
          src: asset['templates'],
          dest: 'web/public/js/' + assetName + '.templates.js',
          options: {
            standalone: true,
            prefix: '',
            module: assetName + '.templates',
            htmlmin: {
              collapseWhitespace: true,
              removeComments: true
            }
          }
        });
        tasks.push('ngtemplates:' + assetName);
      }
      if (asset['js'] != null && asset['js'].length > 0) {
        grunt.config('uglify.' + assetName, {
          options: {
            //banner: "(function(window, undefined) {'use strict';\n\n",
            //footer: "\n\n})(window);",
            mangle: false,
            beautify: true,
          },
          files: [{
            src: asset['js'],
            dest: "web/public/js/" + assetName + ".js"
          }]
        });
        tasks.push('uglify:' + assetName);

        grunt.config('uglify.' + assetName + '-min', {
          options: {
            //banner: "(function(window, undefined) {'use strict';\n\n",
            //footer: "\n\n})(window);",
            mangle: false,
            beautify: true,
          },
          files: [{
            src: asset['js'],
            dest: "web/public/js/" + assetName + ".min.js"
          }]
        });
        tasks.push('uglify:' + assetName + '-min');
      }
      if (asset['files'] != null && asset['files'].length > 0) {
        grunt.config('copy.' + assetName, {
          files: asset['files']
        });
        tasks.push('copy:' + assetName);
      }
    }

    grunt.task.run(tasks);
  })

  // Default task(s).
  grunt.registerTask('default', ['clean', 'build', 'compass', 'watch']);

  setupWatches();
};