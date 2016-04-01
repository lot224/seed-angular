var homeController = ['$scope', function ($scope) {

  $scope.resources = [
    { name: 'AngularJS', version: 'v1.4.7', url: 'https://code.angularjs.org/1.4.7/' },
    { name: 'Bootstrap', version: 'v3.3.5', url: 'https://github.com/twbs/bootstrap/tree/v3.3.5' },
    { name: 'jQuery', version: '1.11.3', url: 'http://jquery.com/' },
  ]

  $scope.devTools = [
    { name: 'Node.js', version: '4.1.1', url: 'https://nodejs.org/en/', description: "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world." },
    { name: 'npm', version: '2.14.4', url: 'https://www.npmjs.com/', description: 'npm is the package manager for JavaScript. Find, share, and reuse packages of code from hundreds of thousands of developers and assemble them in powerful new ways.' },
    { name: 'grunt', version: '~0.4.5', url: 'https://www.npmjs.com/package/' + this.name, description: 'The JavaScript Task Runner' },
    { name: 'grunt-cli', version: '~0.1.13', url: 'https://www.npmjs.com/package/' + this.name, description: 'The grunt command line interface' },
    { name: 'grunt-contrib-jshint', version: '~0.11.3', url: 'https://www.npmjs.com/package/' + this.name, description: 'Validate files with JSHint' },
    { name: 'grunt-contrib-uglify', version: '~0.9.2', url: 'https://www.npmjs.com/package/' + this.name, description: 'Minify javascript files with UglifyJS' },
    { name: 'grunt-contrib-watch', version: '~0.6.1', url: 'https://www.npmjs.com/package/' + this.name, description: 'Run predefined tasks whenever watched file patterns are added, changed or deleted' },
    { name: 'grunt-contrib-compass', version: '~1.0.3', url: 'https://www.npmjs.com/package/' + this.name, description: 'Compile Sass to CSS using Compass' },
    { name: 'grunt-angular-templates', version: '~0.5.7', url: 'https://www.npmjs.com/package/' + this.name, description: 'Grunt build task to concatenate & register your AngularJS templates in the $templateCache' },
    { name: 'grunt-contrib-copy', version: '~0.8.1', url: 'https://www.npmjs.com/package/' + this.name, description: 'Copy files and folders' },
    { name: 'grunt-contrib-concat', version: '~0.5.1', url: 'https://www.npmjs.com/package/' + this.name, description: 'Concatenate files.' },
    { name: 'grunt-contrib-clean', version: '~0.6.0', url: 'https://www.npmjs.com/package/' + this.name, description: 'Clean files and folders' },
    { name: 'bootstrap-sass', version: '~3.3.5', url: 'https://www.npmjs.com/package/' + this.name, description: 'bootstrap-sass is a Sass-powered version of Bootstrap 3, ready to drop right into your Sass powered applications.' },
    { name: 'lite-server', version: '^2.1.0', url: 'https://www.npmjs.com/package/' + this.name, description: 'Lightweight development node server for serving a web app, providing a fallback for browser history API, loading in the browser, and injecting scripts on the fly.' },
  ]
}];