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
      format: '=',
      modelFormat: '=',
    },
    link: function (scope, element, attrs, ngModel) {
      var picker;
      var pickedElem;
      var timeoutId;
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
        if (!element.pickadate) {
          return;
        }

        if (!externalOptions || typeof externalOptions !== 'object') {

          if (angular.isDefined(attrs.pickATime) && typeof attrs.pickATime === 'object') {
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


        // defaultModelFormat is for json schema date-time is ISO8601
        // All the internal date values will be stored with this format.
        var defaultModelFormat = 'HH:i'; // 24h with a leading zero

        // View format on the other hand we get from the pickadate translation file
        var defaultViewFormat  = $.fn.pickatime.defaults.format;

        var modelFormat = fullOptions.modelFormat || scope.modelFormat || defaultModelFormat;
        var viewFormat = fullOptions.format || scope.format || defaultViewFormat;

        fullOptions.format = viewFormat;

        pickedElem = element.pickatime(fullOptions);

        picker = element.pickatime('picker');

        // Some things have to run only once or they freeze the browser!
        if(runOnceUndone){

          // Model => View
          ngModel.$formatters.push(function(value) {
            if (angular.isUndefined(value) || value === null) {
              return value;
            }

            // We set 'view' and 'highlight' instead of 'select'
            // since the latter also changes the input, which we do not want.
            picker.set('view', value, {format: modelFormat});
            picker.set('highlight', value, {format: modelFormat});

            // piggy back on highlight to and let pickadate do the transformation.
            // This is the visible value
            return picker.get('highlight', viewFormat);
          });

          // View to Model
          ngModel.$parsers.push(function() {
            return picker.get('select', modelFormat);
          });

          runOnceUndone = false;
        }
      }// /exec

      // external options override any other options (to prefer)
      if (angular.isDefined(attrs.pickATime)) {
        var onceOptions = scope.$watch('pickATime', function (value) {

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
      }

    } // link
  };
});