angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/datepicker/datepicker.html","<div\n    ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"\n    class=\"form-group {{form.htmlClass}}\">\n\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n        <span ng-if=\"form.fieldAddonLeft\"\n            class=\"input-group-addon\"\n            ng-bind-html=\"form.fieldAddonLeft\"></span>\n        <input ng-show=\"form.key\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            type=\"text\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            style=\"background-color: white\"\n            placeholder=\"{{form.placeholder || form.schema.placeholder }}\"\n            schema-validate=\"form\"\n            pick-a-date=\"form.pickadate\"\n            min-date=\"form.minDate\"\n            max-date=\"form.maxDate\"\n            format=\"form.format\"\n            class=\"form-control {{form.fieldHtmlClass}}\"/>\n\n        <span ng-if=\"form.fieldAddonRight\"\n            ng-bind-html=\"form.fieldAddonRight\"\n            class=\"input-group-addon\"></span>\n    </div>\n\n    <span ng-if=\"form.feedback !== false\"\n          ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n          id=\"{{form.key.slice(-1)[0] + \'Status\'}}\"\n          class=\"form-control-feedback\">\n    </span>\n\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/datepicker/datetimepicker.html","<div\n    ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"\n    class=\"form-group {{form.htmlClass}}\">\n\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n        <div class=\"row row-grid\">\n            <div class=\"col-xs-12 col-sm-6\">\n                <span ng-if=\"form.fieldAddonLeft\"\n                    ng-bind-html=\"form.fieldAddonLeft\"\n                    class=\"input-group-addon\"></span>\n\n                <input ng-show=\"form.key\"\n                    ng-model=\"form.$$date\"\n                    ng-disabled=\"form.readonly\"\n                    type=\"text\"\n                    style=\"background-color: white\"\n                    placeholder=\"{{form.date.placeholder }}\"\n                    pick-a-date=\"form.date.pickadate\"\n                    min-date=\"form.date.minDate\"\n                    max-date=\"form.date.maxDate\"\n                    class=\"form-control {{form.date.fieldHtmlClass}}\"/>\n\n                <span ng-if=\"form.fieldAddonRight\"\n                    ng-bind-html=\"form.fieldAddonRight\"\n                    class=\"input-group-addon\"></span>\n            </div>\n\n            <div class=\"col-xs-12 col-sm-6\">\n                <span ng-if=\"form.fieldAddonLeft\"\n                    ng-bind-html=\"form.fieldAddonLeft\"\n                    class=\"input-group-addon\"></span>\n\n                <input ng-show=\"form.key\"\n                    ng-model=\"form.$$time\"\n                    ng-disabled=\"form.readonly\"\n                    type=\"text\"\n                    style=\"background-color: white\"\n                    placeholder=\"{{form.time.placeholder }}\"\n                    pick-a-time=\"form.time.pickatime\"\n                    min-time=\"form.time.minTime\"\n                    max-time=\"form.time.maxTime\"\n                    class=\"form-control {{form.time.fieldHtmlClass}}\"/>\n\n                <span ng-if=\"form.fieldAddonRight\"\n                    ng-bind-html=\"form.fieldAddonRight\"\n                    class=\"input-group-addon\"></span>\n            </div>\n        </div>\n\n        <input type=\"hidden\"\n            pick-a-date-time=\"form\"\n            ng-model=\"$$value$$\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            schema-validate=\"form\">\n\n    </div>\n\n    <span ng-if=\"form.feedback !== false\"\n          ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n          id=\"{{form.key.slice(-1)[0] + \'Status\'}}\"\n          class=\"form-control-feedback\">\n    </span>\n\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n\n</div>");
$templateCache.put("directives/decorators/bootstrap/datepicker/timepicker.html","<div\n    ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"\n    class=\"form-group {{form.htmlClass}}\">\n\n    <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n\n    <div ng-class=\"{\'input-group\': (form.fieldAddonLeft || form.fieldAddonRight)}\">\n\n        <span ng-if=\"form.fieldAddonLeft\"\n              class=\"input-group-addon\"\n              ng-bind-html=\"form.fieldAddonLeft\"></span>\n        <input ng-show=\"form.key\"\n            ng-model=\"$$value$$\"\n            ng-disabled=\"form.readonly\"\n            type=\"text\"\n            name=\"{{form.key.slice(-1)[0]}}\"\n            style=\"background-color: white\"\n            placeholder=\"{{form.placeholder || form.schema.placeholder }}\"\n            schema-validate=\"form\"\n            pick-a-time=\"form.pickatime\"\n            min-time=\"form.minTime\"\n            max-time=\"form.maxTime\"\n            format=\"form.format\"\n            class=\"form-control {{form.fieldHtmlClass}}\"/>\n\n        <span ng-if=\"form.fieldAddonRight\"\n            ng-bind-html=\"form.fieldAddonRight\"\n            class=\"input-group-addon\"></span>\n    </div>\n\n    <span ng-if=\"form.feedback !== false\"\n          ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n          id=\"{{form.key.slice(-1)[0] + \'Status\'}}\"\n          class=\"form-control-feedback\">\n    </span>\n\n    <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>");}]);
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