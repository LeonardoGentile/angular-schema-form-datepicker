angular.module('schemaForm').directive('pickATime', function () {

  var formatTime = function(value) {
    //Strings or timestamps we make a time of
    if (angular.isString(value) || angular.isNumber(value)) {
      return new Date(value);
    }
    return value; //We hope it's a time object
  };

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      pickATime: '=',
      minTime: '=',
      maxTime: '=',
      format: '='
    },
    link: function (scope, element, attrs, ngModel) {
      var picker;
      var pickedElem;

      //By setting formatSubmit to null we inhibit the
      //hidden field that pickatime likes to create.
      //We use ngModel formatters instead to format the value.
      var basicOptions = {
        onClose: function () {
          element.blur();
        },
        formatSubmit: null
      };

      var externalOptions = scope.pickATime;

      if (!externalOptions || typeof externalOptions !== 'object') {

        if (angular.isDefined(attrs.pickATime) && typeof attrs.pickATime === 'Object') {
          externalOptions = attrs.pickATime;
        }
        else {
          externalOptions = {};
        };
      }

      if (externalOptions.max) {
        externalOptions.max = formatTime(externalOptions.max);
      }
      if (externalOptions.min) {
        externalOptions.min = formatTime(externalOptions.min);
      }

      var fullOptions = angular.merge({}, basicOptions, externalOptions);

      pickedElem = element.pickatime(fullOptions);

      // Defaultformat is for json schema date-time is ISO8601
      // All the internal time values will be stored with this format.
      // NOTE: scope.format or fullOptions.format is only for visualization
      var defaultFormat = "HH:i"; // 24h with a leading zero

      picker = element.pickatime('picker');

      // Model to View
      ngModel.$formatters.push(function(value) {
        if (angular.isUndefined(value) || value === null) {
          return value;
        }

        // We set 'view' and 'highlight' instead of 'select'
        // since the latter also changes the input, which we do not want.
        picker.set('view', value, {format: defaultFormat});
        picker.set('highlight', value, {format: defaultFormat});

        // piggy back on highlight to and let pickadate do the transformation.
        // This is the visible value
        return picker.get('highlight', fullOptions.format || scope.format || defaultFormat );
      });

      // View to Model
      ngModel.$parsers.push(function() {
        return picker.get('select', defaultFormat);
      });


      //bind once.
      if (angular.isDefined(attrs.minTime)) {
        var onceMin = scope.$watch('minTime', function (value) {
          if (value && picker) {
            picker.set('min', formatTime(value));
            onceMin();
          }
        }, true);
      }

      if (angular.isDefined(attrs.maxTime)) {
        var onceMax = scope.$watch('maxTime', function (value) {
          if (value && picker) {
            picker.set('max', formatTime(value));
            onceMax();
          }
        }, true);
      }

    } // link
  };
});