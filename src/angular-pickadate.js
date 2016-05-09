angular.module('schemaForm').directive('pickADate', function () {

  //String dates for min and max is not supported
  //https://github.com/amsul/pickadate.js/issues/439
  //So strings we create dates from
  var formatDate = function(value) {
    //Strings or timestamps we make a date of
    if (angular.isString(value) || angular.isNumber(value)) {
      return new Date(value);
    }
    return value; //We hope it's a date object
  };

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '=',
      pickADate: '=',
      minDate: '=',
      maxDate: '=',
      format: '='
    },
    link: function (scope, element, attrs, ngModel) {
      var picker;
      var pickedElem;

      //By setting formatSubmit to null we inhibit the
      //hidden field that pickadate likes to create.
      //We use ngModel formatters instead to format the value.
      var basicOptions = {
        onClose: function () {
          element.blur();
        },
        formatSubmit: null
      };

      var externalOptions = scope.pickADate;

      if (!externalOptions || typeof externalOptions !== 'object') {

        if (angular.isDefined(attrs.pickADate) && typeof attrs.pickADate === 'Object') {
          externalOptions = attrs.pickADate;
        }
        else {
          externalOptions = {};
        };
      }

      if (externalOptions.max) {
        externalOptions.max = formatDate(externalOptions.max);
      }
      if (externalOptions.min) {
        externalOptions.min = formatDate(externalOptions.min);
      }

      var fullOptions = angular.merge({}, basicOptions, externalOptions);

      pickedElem = element.pickadate(fullOptions);

      // Defaultformat is for json schema date-time is ISO8601
      // All the internal date values will be stored with this format.
      // NOTE: scope.format or fullOptions.format is only for visualization
      var defaultFormat = 'yyyy-mm-dd';

        //View format on the other hand we get from the pickadate translation file
        // var viewFormat    = $.fn.pickadate.defaults.format;

      picker = element.pickadate('picker');

      // Model to View
      ngModel.$formatters.push(function(value) {
        if (angular.isUndefined(value) || value === null) {
          return value;
        }

        //We set 'view' and 'highlight' instead of 'select'
        //since the latter also changes the input, which we do not want.
        picker.set('view', value, {format: defaultFormat});
        picker.set('highlight', value, {format: defaultFormat});

        //piggy back on highlight to and let pickadate do the transformation.
        // This is the visible value
        return picker.get('highlight', fullOptions.format || scope.format || defaultFormat );
      });

      // View to Model
      ngModel.$parsers.push(function() {
        return picker.get('select', defaultFormat);
      });


      //bind once.
      if (angular.isDefined(attrs.minDate)) {
        var onceMin = scope.$watch('minDate', function (value) {
          if ( value && picker ) {
            picker.set('min', formatDate(value));
            onceMin();
          }
        }, true);
      }

      if (angular.isDefined(attrs.maxDate)) {
        var onceMax = scope.$watch('maxDate', function (value) {
          if (value && picker) {
            picker.set('max', formatDate(value));
            onceMax();
          }
        }, true);
      }

    } // /link
  };
});