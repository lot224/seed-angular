angular.module("jdewit", [])
.directive("datePicker", [function () {
  return {
    restrict: 'C',
    link: function (scope, element, attrs, ngModelCtrl) {
      element.datepicker({
        autoclose: attrs.autoclose || true
      });
    }
  };
}])
.directive("timePicker", [function () {
  return {
    restrict: 'C',
    link: function (scope, element, attrs, ngModelCtrl) {
      element.timepicker({
        autoclose: attrs.autoclose || true,
        minuteStep: 1,
        showInputs: true,
        defaultTime: attrs.defaultTime || false
      });
    }
  };
}])