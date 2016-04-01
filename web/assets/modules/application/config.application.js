var applicationConfig = ['$routeProvider', function ($routeProvider) {

  $routeProvider.when('/', { templateUrl: 'home/template.home.htm', controller: 'homeController' });
  $routeProvider.when('/about', { templateUrl: 'about/template.about.htm', controller: 'aboutController', });
  $routeProvider.otherwise({ redirectTo: '/' });

}];