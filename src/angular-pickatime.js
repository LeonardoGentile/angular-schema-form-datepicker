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
      var timeoutId;
      var pickedElem;
      var runOnceUndone = true;

      //By setting formatSubmit to null we inhibit the
      //hidden field that pickatime likes to create.
      //We use ngModel formatters instead to format the value.
      var basicOptions = {
        onClose: function () {
          element.blur();
        },
        formatSubmit: null
      };

      var exec = function(externalOptions) {
        //Bail out gracefully if pickadate is not loaded.
        if (!element.pickatime) {
          return;
        }

        if (!externalOptions || externalOptions.constructor.name !== "Object") {

          if (angular.isDefined(attrs.options) && attrs.options.constructor.name === "Object") {
            externalOptions = attrs.options;
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

        var fullOptions = angular.extend({}, basicOptions, externalOptions);

        pickedElem = element.pickatime(fullOptions);

        //Defaultformat is for json schema date-time is ISO8601
        //i.e.  "hh:mm"
        var defaultFormat = "H:i";

        //View format on the other hand we get from the pickadate translation file
        var viewFormat = $.fn.pickadate.defaults.format;

        picker = element.pickatime('picker');

        // Some things have to run only once or they freeze the browser!
        if (runOnceUndone) {

          //The view value
          ngModel.$formatters.push(function(value) {
            if (angular.isUndefined(value) || value === null) {
              return value;
            }

            //We set 'view' and 'highlight' instead of 'select'
            //since the latter also changes the input, which we do not want.
            picker.set('view', value, {format: scope.format || defaultFormat});
            picker.set('highlight', value, {format: scope.format || defaultFormat});

            //piggy back on highlight to and let pickadate do the transformation.
            return picker.get('highlight', viewFormat);
          });

          ngModel.$parsers.push(function() {
            return picker.get('select', scope.format || defaultFormat);
          });

          runOnceUndone = false;
        };

      }; // /exec

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

      if (angular.isDefined(attrs.pickATime)) {
        var onceOptions = scope.$watch('pickATime', function (value) {

          if( value && picker && value.constructor.name === "Object" ){

            picker.stop();
            // because exec should be run after having un-registered this watcher
            timeoutId = setTimeout(function() {
                exec(value);
                clearTimeout(timeoutId);
            }, 100);
            onceOptions();
          };
        }, true);
      };

       exec();

    } // link
  };
});