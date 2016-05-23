angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/datepicker/datepicker.html","<div\n    ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"\n    class=\"form-group {{form.htmlClass}}\">\n\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n        <span ng-if=\"form.fieldAddonLeft\"\n            class=\"input-group-addon\"\n            ng-bind-html=\"form.fieldAddonLeft\"></span>\n        <input ng-show=\"form.key\"\n            ng-model=\"$$value$$\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-disabled=\"form.readonly\"\n            type=\"text\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            style=\"background-color: white\"\n            placeholder=\"{{form.placeholder || form.schema.placeholder }}\"\n            schema-validate=\"form\"\n            pick-a-date=\"form.pickadate\"\n            min-date=\"form.minDate\"\n            max-date=\"form.maxDate\"\n            format=\"form.format\"\n            model-format=\"form.modelFormat\"\n            class=\"form-control {{form.fieldHtmlClass}}\"/>\n\n        <span ng-if=\"form.fieldAddonRight\"\n            ng-bind-html=\"form.fieldAddonRight\"\n            class=\"input-group-addon\"></span>\n    </div>\n\n    <span ng-if=\"form.feedback !== false\"\n          ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n          id=\"{{form.key.slice(-1)[0] + \'Status\'}}\"\n          class=\"form-control-feedback\">\n    </span>\n\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/datepicker/datetimepicker.html","<div\n    ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"\n    class=\"form-group {{form.htmlClass}}\">\n\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n        <div class=\"row row-grid\">\n            <div class=\"col-xs-12 col-sm-6\">\n                <span ng-if=\"form.fieldAddonLeft\"\n                    ng-bind-html=\"form.fieldAddonLeft\"\n                    class=\"input-group-addon\"></span>\n\n                <input ng-show=\"form.key\"\n                    ng-model=\"form.$$date\"\n                    ng-disabled=\"form.readonly\"\n                    type=\"text\"\n                    style=\"background-color: white\"\n                    placeholder=\"{{form.date.placeholder }}\"\n                    pick-a-date=\"form.date.pickadate\"\n                    min-date=\"form.date.minDate\"\n                    max-date=\"form.date.maxDate\"\n                    format=\"form.date.format\"\n                    model-format=\"form.date.modelFormat\"\n                    class=\"form-control {{form.date.fieldHtmlClass}}\"/>\n\n                <span ng-if=\"form.date.fieldAddonRight\"\n                    ng-bind-html=\"form.date.fieldAddonRight\"\n                    class=\"input-group-addon\"></span>\n            </div>\n\n            <div class=\"col-xs-12 col-sm-6\">\n                <span ng-if=\"form.time.fieldAddonLeft\"\n                    ng-bind-html=\"form.time.fieldAddonLeft\"\n                    class=\"input-group-addon\"></span>\n\n                <input ng-show=\"form.key\"\n                    ng-model=\"form.$$time\"\n                    ng-disabled=\"form.readonly\"\n                    type=\"text\"\n                    style=\"background-color: white\"\n                    placeholder=\"{{form.time.placeholder }}\"\n                    pick-a-time=\"form.time.pickatime\"\n                    min-time=\"form.time.minTime\"\n                    max-time=\"form.time.maxTime\"\n                    format=\"form.time.format\"\n                    model-format=\"form.time.modelFormat\"\n                    class=\"form-control {{form.time.fieldHtmlClass}}\"/>\n\n                <span ng-if=\"form.fieldAddonRight\"\n                    ng-bind-html=\"form.fieldAddonRight\"\n                    class=\"input-group-addon\"></span>\n            </div>\n        </div>\n\n        <input type=\"hidden\"\n            pick-a-date-time=\"form\"\n            ng-model=\"$$value$$\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            schema-validate=\"form\">\n    </div>\n\n    <span ng-if=\"form.feedback !== false\"\n          ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n          id=\"{{form.key.slice(-1)[0] + \'Status\'}}\"\n          class=\"form-control-feedback\">\n    </span>\n\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n\n</div>");
$templateCache.put("directives/decorators/bootstrap/datepicker/timepicker.html","<div\n    ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"\n    class=\"form-group {{form.htmlClass}}\">\n\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n\n        <span ng-if=\"form.fieldAddonLeft\"\n              class=\"input-group-addon\"\n              ng-bind-html=\"form.fieldAddonLeft\"></span>\n        <input ng-show=\"form.key\"\n            ng-model=\"$$value$$\"\n            ng-model-options=\"form.ngModelOptions\"\n            ng-disabled=\"form.readonly\"\n            type=\"text\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            style=\"background-color: white\"\n            placeholder=\"{{form.placeholder || form.schema.placeholder }}\"\n            schema-validate=\"form\"\n            pick-a-time=\"form.pickatime\"\n            min-time=\"form.minTime\"\n            max-time=\"form.maxTime\"\n            format=\"form.format\"\n            model-format=\"form.modelFormat\"\n            class=\"form-control {{form.fieldHtmlClass}}\"/>\n\n        <span ng-if=\"form.fieldAddonRight\"\n            ng-bind-html=\"form.fieldAddonRight\"\n            class=\"input-group-addon\"></span>\n    </div>\n\n    <span ng-if=\"form.feedback !== false\"\n          ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n          id=\"{{form.key.slice(-1)[0] + \'Status\'}}\"\n          class=\"form-control-feedback\">\n    </span>\n\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>");}]);
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
    link: function (scope, element, attrs, ngModelCtrl) {
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
          ngModelCtrl.$formatters.push(function(value) {
            if (angular.isUndefined(value) || value === null || value === "") {
              value = "";
              // These 3 are necessary or editing an empty field will result in non valid form
              ngModelCtrl.$setViewValue(value);
              ngModelCtrl.$commitViewValue();
              ngModelCtrl.$render();
              return value;
            }
            else {
              //We set 'view' and 'highlight' instead of 'select'
              //since the latter also changes the input, which we do not want.
              picker.set('view', value, {format: modelFormat});
              picker.set('highlight', value, {format: modelFormat});

              //piggy back on highlight to and let pickadate do the transformation.
              // This is the visible value
              return picker.get('highlight', viewFormat);
            }
          });

          // View => Model
          ngModelCtrl.$parsers.push(function(value) {
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
            }
            else {
              scope.ngModel = "";

            }
            commitViewValue(ngModelCtrl, scope.ngModel);

          }

        }, true);
    }
  };


})



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
    link: function (scope, element, attrs, ngModelCtrl) {
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
        if (!element.pickatime) {
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
          ngModelCtrl.$formatters.push(function(value) {
            if (angular.isUndefined(value) || value === null || value === "") {
              value = "";
              // These 3 are necessary or editing an empty field will result in non valid form
              ngModelCtrl.$setViewValue(value);
              ngModelCtrl.$commitViewValue();
              ngModelCtrl.$render();
              return value;
            }
            else {
              // We set 'view' and 'highlight' instead of 'select'
              // since the latter also changes the input, which we do not want.
              picker.set('view', value, {format: modelFormat});
              picker.set('highlight', value, {format: modelFormat});

              // piggy back on highlight to and let pickadate do the transformation.
              // This is the visible value
              return picker.get('highlight', viewFormat);
            }
          });

          // View to Model
          ngModelCtrl.$parsers.push(function() {
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
angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var datepicker = function(name, schema, options) {
      if (schema.type === 'string' && (schema.format === 'date')) {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'datepicker';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(datepicker);

    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      'datepicker',
      'directives/decorators/bootstrap/datepicker/datepicker.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'datepicker',
      'directives/decorators/bootstrap/datepicker/datepicker.html'
    );
  }
]);

angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var datetimepicker = function(name, schema, options) {
      if (schema.type === 'string' && (schema.format === 'date-time')) {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'datetimepicker';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(datetimepicker);

    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      'datetimepicker',
      'directives/decorators/bootstrap/datepicker/datetimepicker.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'datetimepicker',
      'directives/decorators/bootstrap/datepicker/datetimepicker.html'
    );
  }
]);
angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var timepicker = function(name, schema, options) {
      if (schema.type === 'string' && (schema.format === 'time')) {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'timepicker';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(timepicker);

    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      'timepicker',
      'directives/decorators/bootstrap/datepicker/timepicker.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'timepicker',
      'directives/decorators/bootstrap/datepicker/timepicker.html'
    );
  }
]);