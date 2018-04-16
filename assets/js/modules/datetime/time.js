var time = ['$compile', '$http', '$templateCache', function ($compile, $http, $templateCache) {


  return {
    restrict: 'C',
    require: '?ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {

    },
    controller: ['$scope', '$element', '$attrs', function ($scope, $element) {
      var popUp;

      var fn = {
        createPopUp: function (callBack) {
          var template = null;
          $http.get('cei/datetime/time.html', { cache: $templateCache }).success(function (html) {
            template = html;
          }).then(function () {
            var nResult = $compile(template)($scope);
            if (typeof callBack === 'function')
              callBack(nResult);
          });
        },
        onFocus: function () {
          popUp.css({ 'display': 'block' });
        },
        onBlur: function (e) {
          e = e || window.event;
          var sourceElement = e.target || e.srcElement;
          var destinationElement;

          setTimeout(function () {
            destinationElement = document.activeElement;

            if (destinationElement === $element[0])
              return;

            while (destinationElement != null) {
              if (destinationElement === popUp[0])
                return;
              destinationElement = destinationElement.parentElement;
            }

            popUp.css({ 'display': 'none' });
          }, 0);

        },
        onDestroy: function () {
          if (popUp) {
            popUp[0].removeEventListener("blur", fn.onBlur, true);
            popUp.remove();
          }

          $element.off('focus', fn.onFocus);
          $element.off('blur', fn.onBlur);
        }
      }

      fn.createPopUp(function (element) {
        popUp = element;
        popUp[0].addEventListener("blur", fn.onBlur, true);

        popUp.insertAfter($element);
      });

      $scope.$on("$destroy", fn.onDestroy);
      $element.on('focus', fn.onFocus);
      $element.on('blur', fn.onBlur);
    }]
  };
}];