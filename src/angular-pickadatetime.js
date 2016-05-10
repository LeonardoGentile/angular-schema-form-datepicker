// The only purpose of that directive is to split date and time into two different fields and combine them together when one of the fields is changed.
angular.module('schemaForm').directive('pickADateTime', function () {

  return {
    restrict: 'A',
    scope: {
      ngModel: '=',
      pickADateTime: '=', // the form
      minTime: '=',
      maxTime: '=',
      minDate: '=',
      maxDate: '=',
    },
    link: function (scope, element, attrs) {
      var momentDateTime = null;
      var momentTime = null;
      var momentDate = null;

      //Init
      if (scope.ngModel && moment(scope.ngModel).isValid()) {
        momentDateTime = moment(scope.ngModel);
        scope.pickADateTime.$$date = momentDateTime.format('YYYY-MM-DD');
        scope.pickADateTime.$$time = momentDateTime.format('HH:mm');
      } else {
        momentDateTime = moment.utc().hours('00').minutes('00');
      }

      scope.$watch('pickADateTime.$$date', function(value) {
        if (value) {
          var date = moment(value, 'YYYY-MM-DD');

          momentDateTime
          .year(date.year())
          .month(date.month())
          .date(date.date());

          scope.ngModel = momentDateTime.toISOString();
        }
      })

      scope.$watch('pickADateTime.$$time', function(value) {
        if (value) {
          var time = value.split(':')
          momentDateTime = moment().hours(time[0]).minutes(time[1]);
          scope.ngModel = momentDateTime.toISOString();
        }
      })
    }
  };


})