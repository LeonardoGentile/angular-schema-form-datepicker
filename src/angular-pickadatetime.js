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
      }

      // scope.$watch('pickADateTime.$$date', function(value) {
      //   if (value) {
      //     var date = moment(value, 'YYYY-MM-DD');

      //     var momentDate = moment()
      //     .year(date.year())
      //     .month(date.month())
      //     .date(date.date());

      //     scope.ngModel = momentDate.toISOString();
      //   }
      // })

      // scope.$watch('pickADateTime.$$time', function(value) {
      //   if (value) {
      //     var time = value.split(':')
      //     momentTime = moment().hours(time[0]).minutes(time[1]);
      //     scope.ngModel = momentTime.toISOString();
      //   }
      // })
      scope.$watch(
        // Observer fn
        function (scope) {
          // if this value changes, then call the listener function
          return {date: scope.pickADateTime.$$date, time: scope.pickADateTime.$$time}
        },
        // Change listener fn
        function(value, oldValue) {
          if (value && value.date && value.time) {

            date = moment(value.date, 'YYYY-MM-DD');
            time = value.time.split(':');

            if (!momentDateTime) momentDateTime = momentDateTime = moment.utc().hours('00').minutes('00');

            momentDateTime
              .year(date.year())
              .month(date.month())
              .date(date.date())
              .hours(time[0])
              .minutes(time[1])
              .seconds(0);

            // scope.pickADateTime.$$datetime = momentDateTime.toISOString();
            scope.ngModel = momentDateTime.toISOString();
          }
        }
        , true);
    }
  }
});
