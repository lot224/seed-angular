
module.exports = function (grunt) {

  grunt.assets = {
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
        'web/assets/modules/global/pollyfill.js',
        'web/assets/modules/global/**/*.js',              // Include all javascript files under .global
        '!web/assets/modules/global/module.global.js',    // Exclude the module file, this needs to be added last.
        '.gruntCache/global.templates.js',                // Add the templates file generated from the ngTemplates package.
        'web/assets/modules/global/module.global.js'      // Finally add the module file back in at the end of the array.
      ]
    },
    application: {
      js: [
          'web/assets/modules/application/**/*.js',                 // Include all javascript files under ..global
          '!web/assets/modules/application/module.application.js',  // Exclude the module file, this needs to be added last.
          '.gruntCache/application.templates.js',                   // Add the templates file generated from the ngTemplates package.
          'web/assets/modules/application/module.application.js'    // Finally add the module file back in at the end of the array.
        ],
      templates: [
        '**/*.htm'
      ]
    },
    site: {
      js: [
        'web/public/js/global.js',
        'web/public/js/application.js'
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
    },
    jshint: {
      options: {
        bitwise: true,
        camelcase: false,
        eqeqeq: false,
        forin: true,
        immed: true,
        indent: 4,
        latedef: true,
        newcap: false,
        noarg: true,
        noempty: true,
        nonew: true,
        regexp: true,
        undef: true,
        unused: true,
        trailing: true,
        predef: ["angular", "window", "document", "console"]
      },
      all: [
        'web/assets/**/*.js'
      ],
      single: []
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
    for (assetName in grunt.assets) {
      var asset = grunt.assets[assetName];

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

  grunt.event.on('watch', function (action, filepath, target) {
    if (filepath.indexOf('.js') > 0) {
      process.stdout.write('\x1Bc');
      grunt.config('jshint.single', filepath);
      grunt.task.run('jshint:single');
    }
  });

  grunt.registerTask('build', 'builds the assets', function (section) {

    var tasks = [];

    var sections = {};

    if (section != null) {
      if (grunt.assets[section] != null) {
        sections[section] = {};
      } else {
        console.log("Section '" + section + '" not found, ending...');
        return;
      }
    } else {
      sections = grunt.assets;
    }

    for (assetName in sections) {
      var asset = grunt.assets[assetName];

      if (asset['templates'] != null && asset['templates'].length > 0) {
        grunt.config('ngtemplates.' + assetName, {
          cwd: 'web/assets/modules/' + assetName + '/features',
          src: asset['templates'],
          dest: '.gruntCache/' + assetName + '.templates.js',
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
  grunt.loadTasks('testing');

  grunt.registerTask('default', ['clean', 'jshint:all', 'build', 'compass', 'watch']);

  setupWatches();
};