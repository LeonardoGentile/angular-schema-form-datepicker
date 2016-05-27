Angular Schema Form Date Picker Add-on
======================================

This is an add-on for [Angular Schema Form](https://github.com/Textalk/angular-schema-form/).

[![Build Status](https://travis-ci.org/Textalk/angular-schema-form-datepicker.svg?branch=master)](https://travis-ci.org/Textalk/angular-schema-form-datepicker)
[![Bower version](https://badge.fury.io/bo/angular-schema-form-datepicker.svg)](http://badge.fury.io/bo/angular-schema-form-datepicker)


Everyone loves a nice date picker - now you can have your very own date picker in Schema Form!
The date picker add-on uses the excellent jQuery-based date picker,
[pickadate.js](http://amsul.ca/pickadate.js/).

Dates in JSON Schema are of type *"string"* and follow the *RFC 3339* date fomat, which, in turn,
follows *ISO 8601*. What does that mean for you? Basically, just stick with the format `yyyy-mm-dd`
and you'll be fine (...but you can change it if you must).

This version of the add-on support:
    - date
    - time
    - datetime

Installation
------------
The date picker is an add-on to the Bootstrap decorator. To use it, just include
`bootstrap-datepicker.min.js` *after* `bootstrap-decorator.min.js`.

You'll need to load a few additional files to use pickadate **in this order**:

1. jQuery (pickadate depends on it)
2. moment.js (only used for datetime, if don't use it, no need for this)
3. The pickadate source files (see the pickadate.js
   [GitHub page](https://github.com/amsul/pickadate.js) for documentation)
3. The pickadate CSS (you'll have to choose theme)
4. [Translation files](https://github.com/amsul/pickadate.js/tree/3.5.6/lib/translations) for whatever language you want to use. 
5. Optionally CSS for datetime type `bootstrap-datepicker.css`

Easiest way is to install is with bower, this will also include dependencies:
```bash
$ bower install angular-schema-form-datetimepicker
```

Usage
-----
The datepicker add-on adds 3 new form type, `datepicker`, `timepicker`, `datetimepicker` and 3 default
mappings.

|  Form Type     |   Becomes    |
|:---------------|:------------:|
|  datepicker    |  a pickadate widget |
|  timepicker    |  a pickatime widget |
|  datetimepicker    |  combination of pickadate + pickatime widgets |


| Schema             |   Default Form type  |
|:-------------------|:------------:|
| "type": "string" and "format": "date"   |   datepicker   |
| "type": "string" and "format": "time"   |   timepicker   |
| "type": "string" and "format": "date-time"   |   datetimepicker   |


Form Type Options
-----------------
###datepicker
The `datepicker` form type takes the following options:

* `minDate`, min selectable date in the widget
* `maxDate`, max selectable date in the widget
* `format`, (default `d mmmm, yyyy`) the visual format of the date, according to [these rules](http://amsul.ca/pickadate.js/date/#formats)
* `modelFormat`, (default `yyyy-mm-dd`) the format used to store the values in the model, following the same rules of `format` 

__OR__

* `pickadate` full date picker [configuration object](http://amsul.ca/pickadate.js/date/#options). If specified all other options will be ignored.

`minDate` and `maxDate` maps to `min` and `max` options of [pickadate conf options both](http://amsul.ca/pickadate.js/date/#limits). They accept one of the following as values:

1. A string in the format `yyyy-mm-dd`,
2. A unix timestamp (as a Number), or
3. An instance of `Date`

__NOTE:__ It is advisable not to use `pickadate` option together with the other options.  

In case you chose to use the `pickadate` option you can pass all the [pickadate options](http://amsul.ca/pickadate.js/date/#options) 
plus the custom `modelFormat` property. 

`modelFormat` (or `pickadate.modelFormat`) option sets the date format used by AngularJS (the real stored value). The default value is `yyyy-mm-dd`, and it is possible to change it but note that in doing so you break the standard and other JSON Schema validators might complain.  
If you use specify this option as a property of the `pickadate` object, please note that this property is used only by this add-on, not by the original pickadate widget.

By default the format of the date displayed by the date picker is set by the [translation files](http://amsul.ca/pickadate.js/date/#translations) (see [Installation](#installation)). It is also possible to change this format to a custom value either by setting the `format` option or the `pickadate.format` property. 

####Example
Below is an example. It's written in javascript instead of pure schema and form so the use of the date object is supported.

```javascript
scope.schema = {
  "type": "object",
  "properties": {
    "birthDate": {
      "title": "Bday",
      "type": "string",
      "format": "date"
    }
  }
}

scope.form = [
  {
    "key": "birthDate",
    "minDate": "1995-09-01",
    "maxDate": new Date(),
    "modelFormat": "yyyy-mm-dd", 
    "format": "`d mmmm, yyyy"
  }
]

// Or using the pickadate options object
scope.form = [
  {
    "key": "birthDate",
    "pickadate" : {
        "min" : "1995-09-01",
        "max" : new Date(),
        "modelFormat" : "yyyy-mm-dd", // this is the only "non-standard" pickadate options
        "format": "d mmmm, yyyy"
    }
  }
]

```


###timepicker
The `timepicker` form type takes the following options:

* `minTime`, min selectable time in the widget
* `maxTime`, max selectable time in the widget
* `format`, (default `h:i A`) the visual format of the time, according to [these rules](http://amsul.ca/pickadate.js/time/#formats)
* `modelFormat`, (default `HH:i`) the format used to store the values in the model, following the same rules of `format` 

__OR__

* `pickatime` full time picker [configuration object](http://amsul.ca/pickadate.js/time/#options). If specified all other options will be ignored.

`minTime` and `maxTime` maps to `min` and `max` [options](http://amsul.ca/pickadate.js/time/#limits) of the time picker widget, so check there for the values accepted.

__NOTE:__ It is advisable not to use `pickatime` option together with the other options.  
  
`modelFormat` (or `pickatime.modelFormat`) option sets the time format used by AngularJS (the real stored value). The default value is `HH:i` (Hour in 24-hour format with a leading zero `:` minutes 00 – 59) and it is possible to change it but note that in doing so you break the standard and other JSON Schema validators might complain.  
If you use specify this option as a property of the `pickatime` object, please note that this property is used only by this add-on, not by the original pickadate widget.

By default the format of the time displayed by the time picker is set by the [translation files](http://amsul.ca/pickadate.js/time/#translations) (see [Installation](#installation)). It is also possible to change this format to a custom value either by setting the `format` option or the `pickadate.format` property. 


####Example
Below is an example. It's written in javascript instead of pure schema and form so the use of the date object is supported.

```javascript
scope.schema = {
  "type": "object",
  "properties": {
    "alarm": {
      "title": "Alarm",
      "type": "string",
      "format": "time"
    }
  }
}

scope.form = [
  {
    "key": "alarm",
    "minTime": [7, 30], // 7.30am
    "maxDate": new Date(2016,04,10, 9, 30), //9.30am
    "modelFormat": "HH:i", // the actual stored value by ng-model
    "format": "h:i A" // the visual format
  }
]

// Or using the pickatime options object
scope.form = [
  {
    "key": "birthDate",
    "pickatime" : {
        "min" : [7, 30],
        "max" : new Date(2016,04,10, 9, 30), 
        "modelFormat" : "HH:i", // this is the only "non-standard" pickatime options
        "format": "h:i A" 
    }
  }
]

```


###datetimepicker
The `datetimepicker` form is a combination of date and type picker. In order to use this widget you need to include the `moment.js` library.
This form type takes only two options:
 
* `date` this is a configuration option used by datepicker, as explained above 
* `time`, this is a configuration option used by timepicker, as explained above

When using this widget is strongly advised to use the object configuration options `pickadate` and `pickatime` over the single options `minDate`, `maxDate`, `minTime`,..
Also, in this case it is not advisable to change the time and date `modelFormat`, the defaults `HH:i` and `yyyy-mm-dd` are assumed.

The filed is set (and considered valid) only if both fields date and time are selected. The 2 inputs are composed to create a standard date-time representation (in string format). Note that if one/none fields are selected then the underlying model will be set to `null` (TODO: maybe better to set to empty string?)

Also note: that bootstrap rows and cells are used in order to display the fields next to one another for large screens and on top of each other for smaller ones. In this case an extra `boostrap-datepicker.css` (optional) can be included in order to introduce a small margin top-margin between the two inputs when collapsed. 

![datetime picker](./datetime.png)
![datetime picker collapsed](./datetime_collapsed.png)


####Example
```javascript
scope.schema = {
  "type": "object",
  "properties": {
    "meeting": {
      "title": "Meeting",
      "type": "string",
      "format": "date-time"
    }
  }
}

scope.form = [
  {
    "key": "meeting",
    date: {
        "placeholder": "Pick a date",
        "pickadate" : {
            "min" : "1995-09-01",
            "max" : new Date(),
            "format": "d mmmm, yyyy" // visual format for date. DO NOT change 'modelFormat'!
        }
    },
    time: {
        "placeholder": "Pick a Time",
        "pickatime" : {
            "min" : [7, 30],
            "max" : new Date(2016,04,10, 9, 30), 
            "format": "h:i A" // visual format for time. DO NOT change 'modelFormat'!
        }
    }
  }
]

```


####TODO:
- Does it really validates with tv4? According to json schema docs, the format option in a schema is optional
- Fix some minor bugs
- Convert it for using it with the new builder

####Help:
Fell free to fork, find bugs and help me improve it, thanks

####Acknowledgement 
I took several pieces of code, clean them up (I should more) and stuck together:
- Original project: https://github.com/Textalk/angular-schema-form-datepicker
- Original date-time idea: https://github.com/goabout/angular-schema-form-datepicker
- Some code: https://github.com/leandropio/angular-schema-form-datepicker

