var settingsProvider = [function () {  // jshint ignore:line
  var _applicationName = 'Default Application';
  var _applicationIcon = 'data:image/png;base64,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';

  var provider = {
    $get: [function () {

      var service = {};

      Object.defineProperties(service, {
        "applicationName": {
          get: function () {
            return _applicationName;
          }
        },
        "applicationIcon": {
          get: function () {
            return _applicationIcon;
          }
        }
      });

      return service;
    }]
  };

  Object.defineProperties(provider, {
    "applicationName": {
      get: function () { return _applicationName; },
      set: function (value) {
        _applicationName = value;
      }
    },
    "applicationIcon": {
      get: function () { return _applicationIcon; },
      set: function (value) {
        _applicationIcon = value;
      }
    }
  });

  return provider;
}];