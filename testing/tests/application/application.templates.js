describe('The application.template module', function () {
  var cache;
  beforeEach(module("application.templates"));
  beforeEach(inject(function ($templateCache) {
    cache = $templateCache;
  }));

  var urls = [
    'home/template.home.htm',
    'about/template.about.htm',
    'navigation/template.navigation.htm'
  ];

  for (index in urls) {
    var url = urls[index];

    it("should be have a templateUrl '" + url + "'", function () {
      var template = cache.get(url);
      expect(template.length).toBeGreaterThan(0);
    });
  }

  it("should be have 3 templates", function () {
    expect(cache.info().size).toEqual(3);
  });

});