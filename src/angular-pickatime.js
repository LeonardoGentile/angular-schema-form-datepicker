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
      var timeoutId2;
      var timeoutId3;
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

        if (externalOptions.format) {
            runOnceUndone = true;
            // re-trigger in order to use the formatter with the correct format options
            var tmpValue = ngModel.$modelValue;

            timeoutId2 = setTimeout(function() {
                scope.$apply(function(){
                    ngModel.$modelValue = "";
                });
                clearTimeout(timeoutId2);
            }, 100);

            timeoutId3 = setTimeout(function() {
                scope.$apply(function(){
                    ngModel.$modelValue = tmpValue;
                });
                clearTimeout(timeoutId3);
            }, 100);

            // ngModel.$modelValue = "yes";
            // ngModel.$modelValue = value;
            // ngModel.$setViewValue("");
            // ngModel.$setViewValue(value);
        }

        var fullOptions = angular.extend({}, basicOptions, externalOptions);

        pickedElem = element.pickatime(fullOptions);

        //Defaultformat is for json schema date-time is ISO8601
        //i.e.  "hh:mm"
        var defaultFormat = "H:i";

        //View format on the other hand we get from the pickadate translation file
        var viewFormat = $.fn.pickatime.defaults.format;

        picker = element.pickatime('picker');

        // Some things have to run only once or they freeze the browser!
        if (runOnceUndone) {

          //The view value (how it will visually appear)
          ngModel.$formatters.push(function cbWrapper(fullOptions) {
            return function(value) {
              if (angular.isUndefined(value) || value === null) {
                return value;
              }

              //We set 'view' and 'highlight' instead of 'select'
              //since the latter also changes the input, which we do not want.
              picker.set('view', value, {format: fullOptions.format || scope.format || defaultFormat});
              picker.set('highlight', value, {format: fullOptions.format || scope.format || defaultFormat});

              //piggy back on highlight to and let pickadate do the transformation.
              return picker.get('highlight', viewFormat);
            }
          }(fullOptions));


          // How the model will be actullly saved
          ngModel.$parsers.push(function cbWrapper(fullOptions) {
            return function() {
              return picker.get('select', fullOptions.format || scope.format || defaultFormat);
            }
          }(fullOptions));

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