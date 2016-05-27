// The only purpose of that directive is to split date and time into two different fields and combine them together when one of the fields is changed.
angular.module('schemaForm').directive('pickADateTime', function () {

  function commitViewValue(ctrl, value) {
    ctrl.$setViewValue(value);
    ctrl.$commitViewValue();
    ctrl.$render();
  }

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      pickADateTime: '=', // the form conf obj
    },
    link: function (scope, element, attrs, ngModelCtrl) {
      var momentDateTime = null;
      var date;
      var time;

      var defaultDateModelFormat = 'YYYY-MM-DD';  // same as "yyyy-mm-dd" for pickadate
      var defaultTimeModelFormat = 'HH:mm';       // same as "HH:i" for pickatime

      // Init: Bind once
      var onceInit = scope.$watch('ngModel', function(value) {
        if (value) {
          if (moment(value).isValid()){
            momentDateTime = moment(value);
            scope.pickADateTime.$$date = momentDateTime.format(defaultDateModelFormat);
            scope.pickADateTime.$$time = momentDateTime.format(defaultTimeModelFormat);
          }
          else {
            scope.ngModel = undefined;
          }
          onceInit();
        }
      }, true);

      scope.$watch(
        // Observer fn
        function (scope) {
          // if this value changes, then call the listener function
          return {date: scope.pickADateTime.$$date, time: scope.pickADateTime.$$time}
        },
        // Change listener fn
        function(value, oldValue) {
          if (value && value.date && value.time) {

              date = moment(value.date, defaultDateModelFormat);
              time = value.time.split(':');

              if (!momentDateTime) {
                momentDateTime = moment.utc()
                  .hours('00')
                  .minutes('00');
              }

              momentDateTime
                .year(date.year())
                .month(date.month())
                .date(date.date())
                .hours(time[0])
                .minutes(time[1])
                .seconds("00");

              scope.ngModel = momentDateTime.toISOString();
          }
          else {
            // TODO: improve this logic
            if (value.date && !value.time || !value.date && value.time) {
              scope.ngModel = "";
              commitViewValue(ngModelCtrl, scope.ngModel);
            }
            // else {
            //   scope.ngModel = "";

            // }


          }

        }, true);
    }
  };


})


