module.exports = function (grunt) { // jshint ignore:line

  var configuration = grunt.configuration = (grunt.option('config') || 'dev').toLowerCase();

  console.info("#######################################################################");
  console.info("##");
  console.info("## Using (" + configuration.green + ") Configuration");
  console.info("## Other Configurations: grunt <task> --config=qa|release|staging|uat|dev");
  console.info("##");
  console.info("## " + "MAKE SURE ALL 'Angular.{env}.config.js' FILES ARE UPDATED CORRECTLY.".yellow);
  console.info("##");
  console.info("#######################################################################\n");

// Folder to deploy the app too, leave blank to do nothing. (such as development where the app folder is the publish folder.)
  var publishLocation =
    configuration === 'qa' ? '' :                     // QA Environment
      configuration === 'release' ? '' :              // Production Environment
        configuration === 'staging' ? '' :            // Staging Environment
          configuration === 'uat' ? '' :              // UAT Environment
            'C:/test/';                         // Dev Environment (leave blank)
  
  var thirdPartyFiles = [
    'node_modules/angular/angular.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-sanitize/angular-sanitize.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js'
  ];

  var copyFiles = [
    { expand: true, flatten: false, cwd: 'node_modules/bootstrap/dist/css/', src: ['**/*.*'], dest: 'public/css/' },
    { expand: true, flatten: false, cwd: 'node_modules/bootstrap/dist/fonts/', src: ['**/*.*'], dest: 'public/fonts/' },
    { expand: true, flatten: false, cwd: 'node_modules/font-awesome/fonts/', src: ['**/*.*'], dest: 'public/fonts/' }
  ];

  var applicationFiles = [
    'assets/js/**/*.js',
    '!assets/js/application.js',
    configuration === 'qa' ? 'angular.QA.config.js' :
      configuration === 'release' ? 'angular.Release.config.js' :
        configuration === 'staging' ? 'angular.Staging.config.js' :
          configuration === 'uat' ? 'angular.UAT.config.js' : 'angular.config.js',
    'assets/js/application.js'
  ];

  var javascriptFiles = [
    '*.js',
    'assets/**/*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ngtemplates: {
      options: {
        standalone: true,
        htmlmin: {
          collapseWhitespace: true,
          removeComments: true
        }
      },
      templates: {
        src: ['**/*.htm'],
        dest: 'public/js/templates.js',
        cwd: 'assets/',
        options: {
          prefix: "template/",
          module: "templates"
        }
      }
    },

    clean: {
      build: ['public'],
//      publish: {
//        src: [publishLocation + '*'],
//        options: {
//          force: true
//        }
//      }
    },

    uglify: {
      options: {
        mangle: false,
        beautify: true,
        //compress: {},
        wrap: false
      },
      all: {
        files: {
          'public/js/thirdparty.js': thirdPartyFiles,
          'public/js/application.js': applicationFiles
        }
      },
      app: {
        files: {
          'public/js/application.js': applicationFiles
        }
      }
    },

    compass: {
      dist: {
        options: {
          httpPath: '/',
          sassDir: 'assets/scss',
          cssDir: 'public/css',
          imagesDir: 'public/img',
          javascriptsDir: 'public/js',
          outputStyle: 'compress',
          noLineComments: true
        }
      }
    },

    copy: {
      build: {
        files: copyFiles
      },
      publish: {
        files: [
          { expand: true, flatten: false, src: ['public/**/*.*'], dest: publishLocation },
          { expand: true, flatten: false, src: ['index.html'], dest: publishLocation },
          { expand: true, flatten: false, src: ['favicon.ico'], dest: publishLocation },
          { expand: true, flatten: false, src: ['web.config'], dest: publishLocation }
        ]
      }
    },
    jshint: {
      options: {
        bitwise: true,
        laxcomma: true,
        camelcase: false,
        eqeqeq: true,
        forin: true,
        immed: true,
        indent: 4,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        regexp: true,
        undef: true,
        unused: true,
        trailing: true,
        predef: ["angular", "window", "document", "console", "$"]
      },
      all: javascriptFiles,
      single: []
    },

    watch: {
      javascript: {
        files: javascriptFiles,
        tasks: ['uglify:app'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['assets/**/*.htm'],
        tasks: ['ngtemplates'],
        options: {
          spawn: false,
        }
      },
      styles: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false,
        }
      },
      viewStyles: {
        files: ['views/**/*.scss'],
        tasks: ['concat:views', 'compass'],
        options: {
          spawn: false,
        }
      }
    },

    serve: {
      options: {
        port: 9000
      }
    }
  });

  grunt.event.on('watch', function (action, filepath) {
    if (filepath.indexOf('.js') > 0) {
      // Clear the Console.
      process.stdout.write('\x1Bc'); // jshint ignore:line
      grunt.config('jshint.single', filepath);
      grunt.task.run('jshint:single');
    }
  });

  grunt.registerTask('appOffline', 'generates the app_offline file', function () {
    grunt.file.write(publishLocation + 'app_offline.htm',
      '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n' +
      '<html xmlns="http://www.w3.org/1999/xhtml" >\n' +
      '<head>\n' +
      '    <title>Application Offline</title>\n' +
      '    <style type="text/css">\n' +
      '\n' +
      '    div {\n' +
      '        background-color:#ffffcc;\n' +
      '        padding-top:10px;\n' +
      '        padding-bottom:10px;\n' +
      '        padding-left:10px;\n' +
      '        padding-right:10px;\n' +
      '        border-style:solid;\n' +
      '        border-color:Black;\n' +
      '        border-width:1px;\n' +
      '    }\n' +
      '\n' +
      '    </style>\n' +
      '</head>\n' +
      '<body>\n' +
      '    <div ID=Application_Offline>\n' +
      '        This application is currently offline.  To enable the application, remove the\n' +
      '        app_offline.htm file from the application root directory.\n' +
      '    </div>\n' +
      '</body>\n' +
      '</html>');
  });

  grunt.registerTask('appOnline', 'removes app_offline file', function () {
    grunt.file.delete(publishLocation + 'app_offline.htm', { force: true });
  });

  grunt.registerTask('deploy', 'Deploys the application to the specified environment.', function () {
    if (publishLocation.length > 0) {
      //grunt.task.run('clean:publish');
      grunt.task.run('appOffline');
      grunt.task.run('copy:publish');
      grunt.task.run('appOnline');
    }
  });

  grunt.registerTask('help', 'Lists a menu of tasks.', function () {

    // takes a string and wraps it, padding the beginning of each line with spaces.
    var wrapString = function (padding, name, line) {
      var maxCharacterLength = 80;

      var spacer = Array(padding + 1).join(' ');

      var taskName = Array((padding + 1) - name.length).join(' ') + name;

      var descriptionMaxCharacerLength = maxCharacterLength - (padding + 1);
      var segments = line.split(' ');

      var lines = [];
      line = '';

      for (var index in segments) {
        if (segments.hasOwnProperty(index)) {
          var segment = segments[index];

          if (line.length + segment.length > descriptionMaxCharacerLength) {
            if (lines.length === 0)
              lines.push(taskName + '  ' + line + '\n');
            else
              lines.push(spacer + '  ' + line + '\n');

            line = '';
          }

          line += ' ' + segment;
          line.trim();
        }  
      }

      if (lines.length === 0)
        lines.push(taskName + '  ' + line);
      else
        lines.push(spacer + '  ' + line);

      return lines.join('');
    };

    var maxTaskNameLength = 0;
    var tasks = [];

    if (grunt.task._tasks.length === 0)
      console.log("No tasks registered.");

    for (var task in grunt.task._tasks) {
      if (grunt.task._tasks.hasOwnProperty(task)) {
        var taskitem = grunt.task._tasks[task];
        var name = taskitem.name;
        var info = taskitem.info;

        if (name.length > maxTaskNameLength)
          maxTaskNameLength = name.length;

        if (info.indexOf('Alias for "') > -1 && name !== 'default')
          tasks.push({ name: name, info: info });
      }
    }

    console.log(''); // Spacer
    for (var n = 0; n < tasks.length; n++) {
      console.info(wrapString(maxTaskNameLength + 1, tasks[n].name, tasks[n].info));
    }
    console.log(''); // Spacer
    console.info("## Use --config argument to change environments ");
    console.info("## " + "Example: grunt publish --config=qa".yellow);
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-serve');

  grunt.registerTask('default', ['help']);
  grunt.registerTask('build', ['clean:build', 'ngtemplates', 'jshint:all', 'uglify', 'compass', 'copy:build']);
  grunt.registerTask('monitor', ['watch']);
  grunt.registerTask('publish', ['clean:build', 'ngtemplates', 'jshint:all', 'uglify', 'compass', 'copy:build', 'deploy']);
  grunt.registerTask('run', ['serve']);
};