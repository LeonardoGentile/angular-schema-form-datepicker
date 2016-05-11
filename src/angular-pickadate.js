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
      format: '=', // visual
      modelFormat: '=', // stored format in the model
    },
    link: function (scope, element, attrs, ngModel) {
      var picker;
      var pickedElem;
      var timeoutId;
      var runOnceUndone = true;

      //By setting formatSubmit to null we inhibit the
      //hidden field that pickadate likes to create.
      //We use ngModel formatters instead to format the value.
      var basicOptions = {
        onClose: function () {
          element.blur();
        },
        formatSubmit: null
      };

      var exec = function(externalOptions) {
        //Bail out gracefully if pickadate is not loaded.
        if (!element.pickadate) {
          return;
        }

        if (!externalOptions || typeof externalOptions !== 'object') {

          if (angular.isDefined(attrs.pickADate) && typeof attrs.pickADate === 'object') {
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

        // defaultModelFormat is for json schema date-time is ISO8601
        // All the internal date values will be stored with this format.
        var defaultModelFormat = 'yyyy-mm-dd';

        // View format on the other hand we get from the pickadate translation file
        var defaultViewFormat  = $.fn.pickadate.defaults.format;

        var modelFormat = fullOptions.modelFormat || scope.modelFormat || defaultModelFormat;
        var viewFormat = fullOptions.format || scope.format || defaultViewFormat;

        fullOptions.format = viewFormat;

        // create the pickadate element
        pickedElem = element.pickadate(fullOptions);

        // Get the picker object
        picker = element.pickadate('picker');

        // Some things have to run only once or they freeze the browser!
        if(runOnceUndone){

          // Model => View
          ngModel.$formatters.push(function(value) {
            if (angular.isUndefined(value) || value === null) {
              return value;
            }

            //We set 'view' and 'highlight' instead of 'select'
            //since the latter also changes the input, which we do not want.
            picker.set('view', value, {format: modelFormat});
            picker.set('highlight', value, {format: modelFormat});

            //piggy back on highlight to and let pickadate do the transformation.
            // This is the visible value
            return picker.get('highlight', viewFormat);
          });

          // View => Model
          ngModel.$parsers.push(function(value) {
            return picker.get('select', modelFormat);
          });

          runOnceUndone = false;
        }
      } // /exec

      // external options override any other options (to prefer)
      if (angular.isDefined(attrs.pickADate)) {
        var onceOptions = scope.$watch('pickADate', function (value) {

          if( value && typeof value === "object" ){
            if (picker) {
              picker.stop();
            }

            // because exec should be run after having un-registered this watcher
            timeoutId = setTimeout(function() {
                exec(value);
                clearTimeout(timeoutId);
            }, 500);
            onceOptions();
          };
        }, true);
      }
      // if 'pickadate' option object is not specified
      else {
        // create the element
        exec();

        // bind once
        if (angular.isDefined(attrs.minDate)) {
          var onceMin = scope.$watch('minDate', function (value) {
            if ( value && picker ) {
              picker.set('min', formatDate(value));
              onceMin();
            }
          }, true);
        }

        // bind once
        if (angular.isDefined(attrs.maxDate)) {
          var onceMax = scope.$watch('maxDate', function (value) {
            if (value && picker) {
              picker.set('max', formatDate(value));
              onceMax();
            }
          }, true);
        }
      }

    } // /link
  };
});