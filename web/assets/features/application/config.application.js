
var applicationConfig = ['$routeProvider', function ($routeProvider) {

  $routeProvider.when('/', { templateUrl: 'home.html' });

  $routeProvider.when('/about', {
    templateUrl: 'about.html',
    controller: 'aboutController',
    resolve: {
      loadDependencies: ['$q',function ($q) {
        var deferred = $q.defer();
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = function () {
          console.log(angular.module("application", ["about"]));

          var ngView = document.getElementById('ngView');
          console.log(ngView);

          setTimeout(deferred.resolve, 5000);

          
        };
        head.appendChild(script);
        script.src = 'public/js/about.js'
        return deferred.promise;
      }]
    }
  });

  $routeProvider.otherwise({ redirectTo: '/' });

  console.log('applicationConfig');
}];