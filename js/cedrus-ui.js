/*!
 * Cedrus UI
 * https://github.com/cedrusco/cedrus-ui
 * @license Copyright Cedrus 2016
 * v0.4.2
 */
(function( window, angular, undefined ){
"use strict";

angular.module('cedrus.ui', ["ng","ngAnimate","ngAria","cedrus.ui.core","cedrus.ui.components.calendar","cedrus.ui.components.chart","cedrus.ui.components.constant","cedrus.ui.components.dateRangePicker","cedrus.ui.components.cdGroupedBarChart","cedrus.ui.components.sidebarFilter","cedrus.ui.components.export"]);
/**
 * @ngdoc module
 * @name cedrus.ui.core
 * @description
 * Defines the core module and external library dependencies like Angular Material.
 */
var Core;
(function (Core) {
    angular
        .module('cedrus.ui.core', ['ngMaterial']);
})(Core || (Core = {}));

/**
 * @ngdoc module
 * @name cedrus.ui.core.config
 *
 * @description
 * A configuration service for the cedrus library.
 */
var Core;
(function (Core) {
    cedrusCoreConfigure.$inject = ["$provide", "$cedrusUIConfigProvider", "$mdThemingProvider"];
    function cedrusCoreConfigure($provide, $cedrusUIConfigProvider, $mdThemingProvider) {
        // Set the default Date Format for the library
        // console.debug('default date format', $cedrusUIConfigProvider.getDefaultDateFormat());
        $cedrusUIConfigProvider.setDefaultDateFormat('MM/dd/yyyy');
        // console.debug('default date format', $cedrusUIConfigProvider.getDefaultDateFormat());
        // Set the default Theme for the library
        /*$mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('red')
            .warnPalette('deep-orange')
            .backgroundPalette('grey');
        */
    }
    angular
        .module('cedrus.ui.core')
        .config(cedrusCoreConfigure);
})(Core || (Core = {}));

/**
 * @ngdoc module
 * @name cedrus.ui.core.filters
 *
 * @description
 * Provide some common filters services.
 */
/**
 * @ngdoc service
 * @name capitalize
 * @module cedrus.ui.core.filters
 *
 * @description
 *
 * A filter service to normalize and capitalize words to 'Camal Case Words'.
 * @param {string} input - Text to capitalize.
 * @param {boolean} all - false will capitalize only the first word, true to capitalize all words.
 *
 */
var Core;
(function (Core) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.capitalize = function (input, all) {
            // regx to capitalize the first word only or all words if (all = true)
            // e.g. 'someText'| capitalize:true
            var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
            function capitalizeWord(word) {
                return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
            }
            // check if input has value
            return (!!input) ? input.replace(reg, capitalizeWord) : '';
        };
        return Utils;
    }());
    angular
        .module('cedrus.ui.core')
        .filter('capitalize', function () { return Utils.capitalize; });
})(Core || (Core = {}));

/**
 * @ngdoc service
 * @name $cedrusConstant
 * @module cedrus.ui.core.constants
 *
 * @description
 * $cedrusConstant Service.
 * Factory function that creates the $cedrusConstant service.
 */
var Core;
(function (Core) {
    /**
     * @ngInject
     */
    var CedrusConstantFactory = (function () {
        function CedrusConstantFactory() {
            /* Constants */
            this.CSS = {
                SAMPLE: '1'
            };
        }
        return CedrusConstantFactory;
    }());
    angular.module('cedrus.ui.core')
        .service('$cedrusConstant', CedrusConstantFactory);
})(Core || (Core = {}));

/**
 * @ngdoc service
 * @name normalizeCamelCase
 * @module cedrus.ui.core.filters
 * @description
 * Define the filter to normalize a string.
 * A filter service to normalize camelCaseWords to regular "camal Case Words".
 * Just add space between small and capital letters.
 * @param {string} input - Text to normalize.
 * @param {boolean} capitalizeFirst - flag to capitalize the first word to "Camal Case Words".

 */
var Core;
(function (Core) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.normalizeCamelCase = function (input, capitalizeFirst) {
            var result = input.replace(/([a-z])([A-Z])/g, '$1 $2');
            return result;
        };
        return Utils;
    }());
    angular
        .module('cedrus.ui.core')
        .filter('normalizeCamelCase', function () { return Utils.normalizeCamelCase; });
})(Core || (Core = {}));

/**
 * @ngdoc service
 * @name $cedrusUIConfig
 * @module cedrus.ui.core
 *
 * @description
 *
 * $cedrusUIConfig Provider to configurate the Cedrus UI
 * ## Sample Usage to change the configuration for the $cedrusUIConfig Provider
 * <hljs lang="js">
 *  angular
 *       .module('cedrus.ui.core')
 *       .config(ConfigService);
 *
 *  ConfigService.$inject = ['$cedrusUIConfigProvider'];
 *
 *  // constructor
 *  function ConfigService($cedrusUIConfigProvider) {
 *      //Sample for using cedrusUIConfig
 *      //console.debug('default date format', $cedrusUIConfigProvider.getDefaultDateFormat());
 *      $cedrusUIConfigProvider.setDefaultDateFormat('dd/MM/yyyy');
 *      //console.debug('default date format', $cedrusUIConfigProvider.getDefaultDateFormat());
 *  }
 *
 *  // Using the $cedrusUIConfig service in a run block.
 *  angular
 *      .module('cedrus.ui')
 *      .run(function ($cedrusUIConfig) {
 *          console.log('run: ', $cedrusUIConfig.getDateFormat());
 *      });
 * </hljs>
 */
var Core;
(function (Core) {
    /**
     * @ngInject
     */
    var UIConfigProvider = (function () {
        function UIConfigProvider() {
            this._UI_DEFAULT_DATE_FORMAT = 'MM/dd/yyyy';
            this.dateFormat = this._UI_DEFAULT_DATE_FORMAT;
        }
        // This will be our factory function($get) for creating the service. This method
        // will be invoked using $injector.invoke() and can use dependency-injection.
        UIConfigProvider.prototype.$get = function () {
            return {
                getDateFormat: this.getDefaultDateFormat
            };
        };
        /** Provider configuration methods  */
        UIConfigProvider.prototype.setDefaultDateFormat = function (dFormat) {
            this.dateFormat = dFormat || this._UI_DEFAULT_DATE_FORMAT;
        };
        UIConfigProvider.prototype.getDefaultDateFormat = function () {
            return this.dateFormat || this._UI_DEFAULT_DATE_FORMAT;
        };
        return UIConfigProvider;
    }());
    Core.UIConfigProvider = UIConfigProvider;
    angular.module('cedrus.ui.core')
        .provider('$cedrusUIConfig', UIConfigProvider);
})(Core || (Core = {}));

/**
 * @ngdoc module
 * @name cedrus.ui.core.util
 *
 * @description
 * Util is a common util methods that can be reused by all components.
 */
var Core;
(function (Core) {
    /**
     * @ngdoc service
     * @name $cedrusUtil
     * @module cedrus.ui.core.util
     *
     * @description
     * $cedrusUtil Provide access to utility methods like log & time.
     */
    var UtilFactory = (function () {
        function UtilFactory() {
            this.isDebug = true;
            /*
             *
             */
            this.now = window.performance ?
                angular.bind(window.performance, window.performance.now) : Date.now || function () {
                return new Date().getTime();
            };
        }
        /**
         * @ngdoc method
         * @name $cedrusUtil#log
         *
         * @description
         * Logger method.
         */
        UtilFactory.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (window['isDebug']) {
                console.debug.apply(console, ['Cedrus UI:'].concat(args));
            }
        };
        /**
         * @ngdoc method
         * @name $cedrusUtil#time
         *
         * @description
         * Measures the number of milliseconds taken to run the provided callback
         * function. Uses a high-precision timer if available.
         */
        UtilFactory.prototype.time = function (cb) {
            var start = this.now();
            cb();
            return this.now() - start;
        };
        return UtilFactory;
    }());
    angular
        .module('cedrus.ui.core')
        .factory('$cedrusUtil', function () { return UtilFactory; });
})(Core || (Core = {}));

/**
 * @ngdoc module
 * @name cedrus.ui.components.calendar
 * @description
 *
 * Calendar
 */
var CdCalendar;
(function (CdCalendar) {
    /**
     * @ngdoc directive
     * @name cdCalendar
     * @module cedrus.ui.components.calendar
     * @description
     * 	Calendar component usage.  Calendar is a form element used to select 'month dates' (e.g. 'January 2016', 'August 1988').

        <form name="vm.exampleForm">
            <cd-calendar ng-model="vm.form.monthDate" options="vm.formOptions"></cd-calendar>
        </form>

        Users may provide an options object.  Currently the only supported option is 'blockFreeTyping'.

        'blockFreeTyping' is a Boolean value that defaults to false.  If true blockFreeTyping will disallow users from manually typing into the input field
        and will only allow the value to be assigned through selecting a date through the pop up calendar.

        Here is an example of an options object for the above example form.

        vm.formOptions = {
            blockFreeTyping: true
        };
     */
    var CalendarComponent = (function () {
        function CalendarComponent() {
            this.templateUrl = 'components/calendar/calendar.tpl.html';
            this.controllerAs = 'vm';
            this.controller = 'CalendarController';
            this.bindings = {
                options: '='
            };
            this.require = {
                ngModel: 'ngModel'
            };
        }
        return CalendarComponent;
    }());
    CdCalendar.CalendarComponent = CalendarComponent;
    angular
        .module('cedrus.ui.components.calendar', [])
        .component('cdCalendar', new CalendarComponent());
})(CdCalendar || (CdCalendar = {}));

/**
 * @ngdoc module
 * @name cedrus.ui.components.chart
 * @description
 *
 * Module allows users to create updating and animated d3 charts with minimal configuration
*/
/**
 * @ngdoc type
 * @name chartOptions
 * @module cedrus.ui.components.chart
 * @property {Object} legend Optional object holding information about a chart legend
 * @property {boolean} legend.enabled Optional indicating whether a legend should be displayed, defaults to true
 * @property {Object} legend.events Optional object each property holds an event handler keyed to its event name. Events bound to chart legend
 * @property {boolean} legend.events.bind Optional property indicating whether users wishes the events 'this' context to be bound to its triggering element
 * @property {number} legend.tickSize Optional Number indicating the size of a graph axis's tickSize
 * @property {string} legend.position Optional String can be 'top' | 'bottom' | 'center' | 'left' | 'right' indicating position of the graph legend
 * @property {number} legend.vOffset Optional Number to indicate a vertical pixel shift of the legend
 * @property {number} legend.hOffset Optional Number to indicate a horizontal pixel shift of the legend
 * @property {string} chartType Required: 'custom' | 'lineChart' | 'pieChart' | 'barChart'  If chartType is 'custom' the user must also provide a customChartService
 * @property {string} customChartService string to point to name of a user created custom chart service.  Required if user selected 'custom' as his/her chart type.
 * @property {number} width Optional property indicating the desired width of the svg element defaults to 360px
 * @property {number} height Optional property indicating the desired height of the svg element defaults to 360px
 * @property {object} events Optional property Optional object each property holds an event handler keyed to its event name. Events bound to chart data elements
 * @property {boolean} events.bind Optional property indicating whether users wishes the events 'this' context to be bound to its triggering element
 * @property {object} animation Optional object where user can adjust animation options
 * @property {number} animation.duration Optional property setting the duration in ms of the d3 transition animation
 * @property {number} animation.delay Optional property setting the time delay in ms from when an animation is triggered and when it starts
 * @property {string} animation.type set type to 'none' to turn off animation which is active by default more types forthcoming
 * @property {object} tooltip Optional object containing tooltip configuration tooltip currently unsupported in multi series graphs
 * @property {boolean} tooltip.enabled Optional property.  Tooltip enabled by default and will display y axis values
 * @property {string} tooltip.position 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se' Optional property sets tooltip position in relative to its trigger element using compass directions
 * @property {string|PropertyFunction} tooltip.customText Optional Property function returned string sets the innerHTML of the tooltip
 * @property {function}  customHTMLoverlay returns the inner text for a custom HTML Div element that will overlay the chart
 * @property {object[]} series Array containing settings for each individual series
 */
/**
 * @ngdoc type
 * @name PropertyFunction
 * @module cedrus.ui.components.chart
 * @description A Property Function is used to access and provide a string or numerical value from a datum to be used in d3 rendering
 *
 * Example
 *  <hljs lang="js">
 * (d,i,n) => { return d['value'] * 1.5 }
 * </hljs>
 *
 *  This function acts as a callback to access the 'value' property on datum 'd', modifies and returns it so it can be used in d3 rendering.
 * callback PropertyFunction
 * @param {*} d Datum associacted with a given element, used in d3 callback pattern
 * @param {number} i Index of the datum
 * @param {Object} n Object containing collection of nodes associacted with a datum and a collection of it's parents
 * @return {string|number} Returns a string or numerical value that d3 will use in rendering
 */
/**
 * @ngdoc directive
 * @name cdChart
 * @module cedrus.ui.components.chart
 *
 * @description
 *
 * Component holds the controller for the cdChart component and calls on the chart service specifed in the
 * configuration to create the d3 chart
 */
/**
 * @ngdoc service
 * @name DrawService
 * @module cedrus.ui.components.chart
 * @description
 *
 * DrawService is the base class from which all DrawServices (lineChart, pieChart, ...etc) are derived.
 *
 */
/**
 * @ngdoc property
 * @name DrawService#padding
 * @description
 * The baseline padding in pixels for all charts. Usually used to pad the space between a chart and it's axis
 * @returns {Number}
 */
/**
 * @ngdoc property
 * @name DrawService#legendRectSize
 * @description
 * Defines the width and height in pixels of the rectangle element (square) in a chart's legend
 * @returns {Number}
 */
/**
 * @ngdoc property
 * @name DrawService#legendSpacing
 * @description
 * Defines the vertical and horizontal spacing between two legend rectangles
 * @returns {Number}
 */
/**
 * @ngdoc method
 * @name DrawService#mergeEvents
 * @description
 * d3's event system allows for only a single handler to fire for any givent event
 * mergeEvents combines the excution of mulitple handles into a single function
 * @param {Object} options The user passed configuration stored as options
 */
/**
 * @ngdoc method
 * @name DrawService#createTooltip
 * @description
 * creates the tooltip element using d3-tip and adds the tooltip events to the hashmap of events to be merged in the mergeEvents method
 * @param {Object} svg The base svg element of the chart
 * @param {Object} options The user passed configuration stored as options
 * @param {Object} drawSettings The drawSettings property containing option values that vary between execution
 * @param {Object} accessor Default accessor to extract the displayed value that will be displayed in the tooltip
 */
/**
 * @ngdoc method
 * @name DrawService#createAccessor
 * @param {string|PropertyFunction} prop string property or property function used to access a value within a given datapoint
 * @param {string} propName Name of the property being set x accessor y accessor etc
 * @return {PropertyFunction} returns a PropertyFunction that will be called within d3;
 * @description
 * used to create an accessor function.  Accessors are functions use the chart dataset to extract values
 * to deterimine positions on chart or to compute display text or values on a chart
 *
 * prop as a string will be converted to a function:
 * <hljs lang="js">
 * this.createAccessor('name','xAccessor')
 * </hljs>
 * will return (d,i,n) => d['name'];
 *
 * Prop as a Propertyfunction will remain as a function
 * <hljs lang="js">
 * var accessor = (d,i,n) => {return d['name'] + ' is the ' + i + ' datum in the list of ' n.}
 * </hljs>
 *
 * will return (d,i,n) => {return d['name'] + ' is the ' + i + ' datum in the list of ' n.}
*/
/**
 * @ngdoc method
 * @name DrawService#attachListenters
 * @param {Object} selection D3 selection object
 * @param {Object} eventMap Hashmap keyed by DOM event names to arrays of corresponding event handlers
 * @param {Boolean} bind Optional boolean indicating whether the event handler's 'this' context should be bound to its attached element
 * @description Attach intended event handlers to the provided d3 selection.  D3's event handling typically only allows for a single handler
 * for a given event on an element. This method allows mulitple handlers to be invoked by providing a wrapper function for multiple handlers
 * */
/**
 * @ngdoc method
 * @name DrawService#prepareOptions
 * @param {Object} svg The base svg element of the chart
 * @param {Object[]} data Array containg that data that is being graphed
 * @param {Object} options The user passed configuration stored as options
 * @param {Object} drawSettings The drawSettings property containing option values that vary between executions
 * @description Abstract Service Method: Used to populate fields on the drawSettings object to define options that vary between executions
 */
/**
 * @ngdoc method
 * @name DrawService#draw
 * @param {Object} svg The base svg element of the chart
 * @param {Object[]} data Array containg that data that is being graphed
 * @param {Object} options The user passed configuration stored as options
 * @param {Object} drawSettings The drawSettings property containing option values that vary between executions
 * @description Abstract Service Method: Used to Draw the non-series specific element of the chart such as the legend,
 * axes and sizing the svg element and viewport
 */
/**
 * @ngdoc method
 * @name DrawService#drawSeries
 * @param {Object} svg The base svg element of the chart
 * @param {Object[]} data Array containg that data that is being graphed
 * @param {Object} options The user passed configuration stored as options
 * @param {Object} drawSettings The drawSettings property containing option values that vary between executions
 * @param {Number} index The index within options.series to access the dataset for the series being drawn
 * @description Abstract Service Method: Used to Draw each series of a graph in both single series or multi-series chart
 */
/**
 * @ngdoc method
 * @name DrawService#drawSeries
 * @param {Object} svg The base svg element of the chart
 * @param {Object[]} data Array containg that data that is being graphed
 * @param {Object} options The user passed configuration stored as options
 * @param {Object} drawSettings The drawSettings property containing option values that vary between executions
 * @param {Number} index The index within options.series to access the dataset for the series being drawn
 * @description Abstract Service Method: Used to Draw each series of a graph in both single series or multi-series chart
 */
/**
 * @ngdoc method
 * @name DrawService#definePosition
 * @param {Object} options The user passed configuration stored as options
 * @param {Object} drawSettings The drawSettings property containing option values that vary between executions
 * @param {Object} svg The base svg element of the chart
 * @description Abstract Service Method: Used within a service to make calculations that determine position details within a
 * particular chart such as the horizontal and vertical offsets for the graph legend, or padding for the x-scale and y scale functions
 */
var CdCharts;
(function (CdCharts) {
    var CdChartController = (function () {
        /* @ngInject */
        CdChartController.$inject = ["$element", "$injector"];
        function CdChartController($element, $injector) {
            var _this = this;
            this.$element = $element;
            this.$injector = $injector;
            // provide default chart options
            this.defaultOptions = {
                width: 360,
                height: 360
            };
            // initialzie drawSettings object
            this.drawSettings = {};
            // map of chart types
            this.chartTypes = {
                'pieChart': 'pieChartService',
                'lineChart': 'lineChartService'
            };
            this.drawChart = function (optionsChanged) {
                if (_this.chartService) {
                    if (optionsChanged) {
                        _this.chartService.mergeEvents(_this.options);
                        _this.chartService.definePosition(_this.options, _this.drawSettings, _this.svg);
                        _this.chartService.prepareOptions(_this.svg, _this.data, _this.options, _this.drawSettings);
                    }
                    _this.chartService.draw(_this.svg, _this.data, _this.options, _this.drawSettings);
                    if (_this.options.series) {
                        _this.options.series.forEach(function (series, index) {
                            var isVisible = series.visible !== false;
                            var dataset = isVisible ? _this.data[series.dataset] : [];
                            _this.chartService.drawSeries(_this.svg, dataset, _this.options, _this.drawSettings, index);
                        });
                    }
                }
            };
            this.width = this.defaultOptions.width;
            this.height = this.defaultOptions.height;
            // assign root chart element
            this.element = d3.select(this.$element[0]);
            this.svg = d3.select(this.$element[0]).select('svg')
                .attr('width', this.width)
                .attr('height', this.height);
        }
        CdChartController.prototype.$onInit = function () {
            // merge provided options with defaultOptions
            this.options = angular.merge({}, this.defaultOptions, this.options);
            this.width = this.options.width;
            this.height = this.options.height;
            this.svg
                .attr('width', this.width)
                .attr('height', this.height);
            // console.log('onInit', this.options);
            // retrieve appropriate chart service
            if (this.chartTypes[this.options.chartType]) {
                this.chartService = this.$injector.get(this.chartTypes[this.options.chartType]);
            }
            else if (this.options.chartType === 'custom') {
                this.chartService = this.$injector.get(this.options.customChartService);
                if (!this.chartService)
                    console.warn('No custom chart service provided for custom chart type');
            }
            else {
                console.warn('Service for chart type: ' + this.options.chartType + ' not found');
            }
            this.drawChart(true);
        };
        CdChartController.prototype.$onChanges = function (changeObj) {
            // console.log('onChanges', changeObj);
            var optionsChanged = changeObj.options ? true : false;
            this.drawChart(optionsChanged);
        };
        return CdChartController;
    }());
    CdChartController.$inject = ['$element', '$injector'];
    var CdChartComponent = (function () {
        function CdChartComponent() {
            this.bindings = {
                data: '<',
                options: '<'
            };
            this.template = "<div>\n            <div class=\"custom-overlay\">\n                <div ng-if=\"vm.options.customHTMLoverlay\" ng-include=\"vm.options.customHTMLoverlay\">\n                </div>\n            </div>\n            <svg></svg>\n        </div>";
            this.controller = CdChartController;
            this.controllerAs = 'vm';
        }
        return CdChartComponent;
    }());
    angular
        .module('cedrus.ui.components.chart', [])
        .component('cdChart', new CdChartComponent());
    var DrawService = (function () {
        function DrawService() {
            var _this = this;
            /**  padding level in pixels */
            this.padding = 40;
            this.legendRectSize = 12;
            this.legendSpacing = 4;
            /** scale map for future use with user provided scale option */
            this.scaleMap = {
                linear: d3.scaleLinear(),
                log: d3.scaleLog(),
                ordinal: d3.scaleOrdinal()
            };
            this.createTooltip = function (svg, options, drawSettings, accessor) {
                accessor = (options.tooltip && options.tooltip.customText) ? _this.createAccessor(options.tooltip.customText, 'tooltip data accessor') : _this.createAccessor('value', 'tooltip data accessor');
                // accessor = this.createAccessor('displayedValue', 'tooltip data accessor');
                var tip = d3.tip();
                tip.attr('class', 'cd-chart d3-tip');
                tip.html(function (d) {
                    return accessor(d);
                });
                if (options.tooltip && options.tooltip.position) {
                    tip.direction(options.tooltip.position);
                }
                ;
                svg.call(tip);
                _this.events['mouseover'].push(tip.show);
                _this.events['mouseout'].push(tip.hide);
                if (!drawSettings.tip)
                    drawSettings.tip = tip;
                return tip;
            };
        }
        DrawService.prototype.mergeEvents = function (options) {
            if (!options)
                return;
            var events = {
                mouseout: [],
                mouseover: []
            };
            if (options.events)
                Object.keys(options.events).forEach(function (key) {
                    if (key === 'bind')
                        return;
                    if (!events[key])
                        events[key] = [];
                    events[key].push(options.events[key]);
                });
            this.events = events;
        };
        /**  Wrapper function to access or process user provided data */
        DrawService.prototype.createAccessor = function (prop, propName) {
            if (!prop) {
                console.warn('Must Provide a Key for property: ' + propName);
            }
            // If the property is a function
            if (typeof prop === 'function') {
                return function (d, i, n) {
                    if (d.data)
                        d = d.data;
                    return prop(d, i, n);
                };
            }
            else {
                return function (d) {
                    return d[prop];
                };
            }
        };
        DrawService.prototype.attachListenters = function (selection, eventMap, bind) {
            var eventTitles = Object.keys(eventMap);
            eventTitles.forEach(function (eventName) {
                selection.on(eventName, function (d, i, n) {
                    var _this = this;
                    var currentEvent = angular.copy(d3.event);
                    if (!Array.isArray(eventMap[eventName]))
                        eventMap[eventName] = [eventMap[eventName]];
                    eventMap[eventName].forEach(function (event, eventNum) {
                        bind ? event.bind(_this)(d, i, n, currentEvent) : event(d, i, n, currentEvent);
                    });
                });
            });
        };
        return DrawService;
    }());
    DrawService.$inject = ['$scope'];
    CdCharts.DrawService = DrawService;
})(CdCharts || (CdCharts = {}));

/**
     * @ngdoc module
     * @name cedrus.ui.components.constant
     * @description
     * Constant module
     */
var cedrus;
(function (cedrus) {
    var ui;
    (function (ui) {
        var components;
        (function (components) {
            var constant;
            (function (constant) {
                'use strict';
                /**
                 * @ngdoc directive
                 * @name cdConstant
                 * @module cedrus.ui.components.constant
                 * @description
                 * This directive simplify accessing the application constants without using a controller. In general, it can extract the information from a defined constant, value, or service.
                 *
                 * @usage
                 * ## Angular Constants sample
                 * <hljs lang="js">
                 *  angular.module('myApp')
                 *      .constant('simple', 'Hello')
                 *      .constant('complex', { address: {line1: 'Address line 1', line2: 'address line 2' }})
                 * </hljs>
                 *
                 * ## HTML samples:
                 * <hljs lang="html">
                 *  # Use as attribute
                 *  <span cd-constant="simple"> Show constant </span>
                 *  <span cd-constant="simple" replace="true"></span>
                 *
                 *  ## Using attribute, and replace flag
                 *  <div cd-constant="complex" key="address.line1" replace="false"><div>Other complex Text</div></div>
                 *
                 *  ## Use as Element
                 *  <cd-constant name="simple"></cd-constant>
                 *  <cd-constant name="complex" key="address.line2" replace="true"></cd-constant>
                 * </hljs>
                 */
                var ConstantDirective = (function () {
                    function ConstantDirective($injector) {
                        var _this = this;
                        this.$injector = $injector;
                        this.restrict = 'EA';
                        // No need to create isolated scope, we will use the attrs to refer to the bindings
                        this.scope = {
                            /* name of the Constant or service  */
                            name: '@?',
                            /* attribute key name of complex object that is returned from evaluating the name */
                            key: '@?',
                            /* Replace the element content : true or false */
                            replace: '@?'
                        };
                        this.link = function (scope, element, attrs) {
                            var isReplace = (attrs['replace'] === 'true');
                            var name = attrs['cdConstant'] || attrs['name'];
                            var key = attrs['key'];
                            var value;
                            if (attrs['name'] && !name) {
                                console.error('constant name is not provided');
                            }
                            if (name) {
                                if (typeof name === 'string') {
                                    value = _this.$injector.get(name);
                                }
                                else {
                                    value = name;
                                }
                                // console.info(value);
                                if (key != null && key !== '') {
                                    // value = value[key];
                                    // Support deep property reference using the 'key'
                                    // e.g. key = x.y.z will be evaluated to value[x][y][z]
                                    value = key.split('.').reduce(function (obj, i) { return obj[i]; }, value);
                                    // console.warn(value);
                                }
                                else if (attrs['key']) {
                                    console.warn('constant key is defined without a value');
                                }
                                // Check if we need to replace the element
                                if (isReplace === true) {
                                    element.replaceWith(value);
                                }
                                else {
                                    element.text(value);
                                }
                            }
                        };
                        // console.log('constant component initilized');
                    }
                    return ConstantDirective;
                }());
                ConstantDirective.$inject = ['$injector'];
                ConstantDirective.factory = function () {
                    function instance($injector) {
                        return new ConstantDirective($injector);
                    }
                    instance.$inject = ['$injector'];
                    return instance;
                };
                angular.module('cedrus.ui.components.constant', [])
                    .directive('cdConstant', ConstantDirective.factory());
            })(constant = components.constant || (components.constant = {}));
        })(components = ui.components || (ui.components = {}));
    })(ui = cedrus.ui || (cedrus.ui = {}));
})(cedrus || (cedrus = {}));

/**
 * @ngdoc module
 * @name cedrus.ui.components.dateRangePicker
 */
/**
 * @ngdoc directive
 * @name cdDateRangePicker
 * @module cedrus.ui.components.dateRangePicker
 */
var cedrus;
(function (cedrus) {
    var ui;
    (function (ui) {
        var components;
        (function (components) {
            var dateRangePicker;
            (function (dateRangePicker) {
                var DateRangePickerComponent = (function () {
                    function DateRangePickerComponent() {
                        this.bindings = {
                            options: '<?',
                            ngModel: '<',
                            ngModelOptions: '<?',
                            ngChange: '&?'
                        };
                        this.require = {
                            ngModel: 'ngModel'
                        };
                        this.templateUrl = 'components/date-range-picker/date-range-picker.tpl.html';
                        this.controller = 'CdDateRangePicker';
                        this.controllerAs = 'vm';
                    }
                    return DateRangePickerComponent;
                }());
                angular
                    .module('cedrus.ui.components.dateRangePicker', [])
                    .component('cdDateRangePicker', new DateRangePickerComponent());
            })(dateRangePicker = components.dateRangePicker || (components.dateRangePicker = {}));
        })(components = ui.components || (ui.components = {}));
    })(ui = cedrus.ui || (cedrus.ui = {}));
})(cedrus || (cedrus = {}));

var CdgroupedBarChart;
(function (CdgroupedBarChart) {
    var GroupedBarChartComponent = (function () {
        function GroupedBarChartComponent() {
            this.bindings = {
                data: '=',
                options: '='
            };
            this.templateUrl = 'components/grouped-bar-chart/grouped-bar-chart.tpl.html';
            this.controller = 'groupedBarChartController';
            this.controllerAs = 'vm';
            this.transclude = true;
        }
        return GroupedBarChartComponent;
    }());
    angular
        .module('cedrus.ui.components.cdGroupedBarChart', [])
        .component('cdGroupedBarChart', new GroupedBarChartComponent());
})(CdgroupedBarChart || (CdgroupedBarChart = {}));

var cedrus;
(function (cedrus) {
    var ui;
    (function (ui) {
        var components;
        (function (components) {
            var sidebarFilter;
            (function (sidebarFilter) {
                var SidebarFilter = (function () {
                    function SidebarFilter() {
                        this.templateUrl = 'components/sidebar-filter/sidebar-filter.tpl.html';
                        this.controllerAs = 'vm';
                        this.controller = 'SidebarFilterController';
                        this.bindings = {
                            options: '<',
                            customFields: '<?'
                        };
                    }
                    return SidebarFilter;
                }());
                angular
                    .module('cedrus.ui.components.sidebarFilter', [])
                    .component('cdSidebarFilter', new SidebarFilter());
            })(sidebarFilter = components.sidebarFilter || (components.sidebarFilter = {}));
        })(components = ui.components || (ui.components = {}));
    })(ui = cedrus.ui || (cedrus.ui = {}));
})(cedrus || (cedrus = {}));

var CdCalendar;
(function (CdCalendar) {
    var CalendarController = (function () {
        CalendarController.$inject = ["$element"];
        function CalendarController($element) {
            this.$element = $element;
            this.yearMap = [
                [-4, -3, -2],
                [-1, 0, 1],
                [2, 3, 4],
                [5, 6, 7]
            ];
            this.monthMap = [
                [{ display: 'Jan', value: 'January' }, { display: 'Feb', value: 'February' }, { display: 'Mar', value: 'March' }],
                [{ display: 'Apr', value: 'April' }, { display: 'May', value: 'May' }, { display: 'Jun', value: 'June' }],
                [{ display: 'Jul', value: 'July' }, { display: 'Aug', value: 'August' }, { display: 'Sep', value: 'September' }],
                [{ display: 'Oct', value: 'October' }, { display: 'Nov', value: 'November' }, { display: 'Dec', value: 'December' }]
            ];
        }
        CalendarController.prototype.$onInit = function () {
            this.initYear = new Date().getFullYear();
            this.date = {
                selYear: this.initYear,
                selMonth: ''
            };
            this.showCal = false;
        };
        CalendarController.prototype.$postLink = function () {
            this.inputEl = this.$element.find('input');
            if (this.options && this.options.blockFreeTyping === true) {
                this.inputEl.keydown(function (e) {
                    e.preventDefault();
                });
            }
        };
        CalendarController.prototype.displayCal = function () {
            this.showCal = !this.showCal;
            if (this.showCal) {
                this.inputEl.focus();
            }
        };
        CalendarController.prototype.flipCal = function () {
            this.yearSel = !this.yearSel;
        };
        CalendarController.prototype.setYear = function (num) {
            if (!this.date.selYear)
                this.date.selYear = this.initYear;
            this.date.selYear += num;
        };
        CalendarController.prototype.setMonth = function (month) {
            if (!this.date.selYear)
                this.date.selYear = this.initYear;
            this.date.selMonth = month;
            this.ngModel.$setViewValue(this.date.selMonth + ' ' + this.date.selYear);
            this.ngModel.$render();
            this.selection = this.ngModel.$viewValue;
            this.showCal = false;
        };
        return CalendarController;
    }());
    CalendarController.$inject = ['$element'];
    CdCalendar.CalendarController = CalendarController;
    angular
        .module('cedrus.ui.components.calendar')
        .controller('CalendarController', CalendarController);
})(CdCalendar || (CdCalendar = {}));

var CdCharts;
(function (CdCharts) {
    var CdBarChartService = (function () {
        function CdBarChartService() {
            this.chartBuilt = false;
        }
        CdBarChartService.prototype.draw = function (svg, data, options) {
            var margin = { top: 30, right: 30, bottom: 40, left: 80 };
            var height = options.height - margin.top - margin.bottom;
            var width = options.width - margin.left - margin.right;
            var barWidth = 50;
            var barOffset = 5;
            var xAxisProperty = ''; // options.xAxisProperty;
            var yAxisProperty = ''; // options.yAxisProperty;
            if (!this.chartBuilt) {
                svg = svg.append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
                this.xAxis = d3.select('svg').append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                    .attr('class', 'xAxis');
                this.yAxis = d3.select('svg').append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
                    .attr('class', 'yAxis');
                this.chartBuilt = true;
            }
            /******* Scaling ********/
            var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d[yAxisProperty]; })]).range([0, height]);
            var xScale = d3.scaleBand().domain(data.map(function (d) { return d[xAxisProperty]; })).rangeRound([0, width]).paddingInner(0.05).paddingOuter(0.05);
            // Depending on value
            var colorsop1 = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d[yAxisProperty]; })]).range(['#FFB832', '#C61C6F']);
            // Depending on position
            var colorsop2 = d3.scaleLinear().domain([0, data.length]).range(['#FFB832', '#C61C6F']);
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function (d) {
                return "<strong>" + yAxisProperty + ":</strong> <span> " + d[yAxisProperty] + " </span>";
            });
            svg.call(tip);
            // Vertical Axis
            var vGuideScale = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d[yAxisProperty]; })]).range([height, 0]);
            var xAxisGen = d3.axisLeft(vGuideScale).ticks(10);
            // Horizantal Axis
            var yAxisGen = d3.axisBottom(xScale);
            var bars = svg.selectAll('rect').data(data);
            bars.enter().append('rect').merge(bars).style('fill', function (d, i) { return colorsop2(i); })
                .attr('width', function (d) { return xScale.bandwidth(); })
                .attr('height', 0)
                .attr('x', function (d) { return xScale(d[xAxisProperty]); })
                .attr('y', height)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .transition()
                .attr('height', function (d) { return yScale(d[yAxisProperty]); })
                .attr('y', function (d) { return height - yScale(d[yAxisProperty]); })
                .delay(function (d, i) { return i * 20; })
                .duration(1000);
            // svg.select('.xAxis').call(xAxisGen);
            // svg.select('.yAxis').call(yAxisGen);
            xAxisGen(this.xAxis);
            yAxisGen(this.yAxis);
            bars.exit().remove();
        };
        return CdBarChartService;
    }());
    CdCharts.CdBarChartService = CdBarChartService;
    angular.module('cedrus.ui.components.chart')
        .service('barChartService', CdBarChartService);
})(CdCharts || (CdCharts = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CdCharts;
(function (CdCharts) {
    var CdLineChartService = (function (_super) {
        __extends(CdLineChartService, _super);
        function CdLineChartService() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** Retrieve yAxis maximum from the dataset(s) to allow for approrpiate scaling */
        CdLineChartService.prototype.getMaxY = function (data, options, yAccessor) {
            var _this = this;
            if (options.axes.y.max)
                return options.axes.y.max;
            var yMaxes = [];
            if (options.series) {
                options.series.forEach(function (series, index) {
                    var seriesAccessor = series.yKey ? _this.createAccessor(series.yKey) : yAccessor;
                    if (series.visible === false)
                        return;
                    var dataset = data[series.dataset];
                    if (dataset) {
                        yMaxes.push(d3.max(dataset, function (datum) {
                            return parseInt(seriesAccessor(datum));
                        }));
                    }
                });
            }
            return d3.max(yMaxes);
        };
        /** Retrieve yAxis minimum from the dataset(s) to allow for approrpiate scaling */
        CdLineChartService.prototype.getMinY = function (data, options, yAccessor) {
            return options.axes.y.min ? options.axes.y.min : 0;
        };
        /** Retrieve xAxis maximum from the dataset(s) to allow for approrpiate scaling */
        CdLineChartService.prototype.getMaxX = function (data, options, xAccessor) {
            if (options.axes.max)
                return options.axes.max;
            var xMaxes = [];
            if (options.series) {
                options.series.forEach(function (series, index) {
                    if (series.visible === false)
                        return;
                    var dataset = data[series.dataset];
                    if (dataset) {
                        xMaxes.push(d3.max(dataset, function (datum) {
                            return xAccessor(datum);
                        }));
                    }
                });
            }
            return d3.max(xMaxes);
        };
        /** Retrieve xAxis minimum from the dataset(s) to allow for approrpiate scaling */
        CdLineChartService.prototype.getMinX = function (data, options, xAccessor) {
            if (options.axes.min)
                return options.axes.min;
            var xMins = [];
            if (options.series) {
                options.series.forEach(function (series, index) {
                    if (series.visible === false)
                        return;
                    var dataset = data[series.dataset];
                    // console.log('dataset value:', dataset);
                    if (dataset) {
                        xMins.push(d3.min(dataset, function (datum) {
                            return xAccessor(datum);
                        }));
                    }
                });
            }
            return d3.min(xMins);
        };
        /** create axis generator based on provided options */
        CdLineChartService.prototype.createAxes = function (scale, options, location, axis) {
            var axisMap = {
                bottom: d3.axisBottom,
                top: d3.axisTop,
                left: d3.axisLeft,
                right: d3.axisRight
            };
            var axisGen = axisMap[location]().scale(scale);
            if (options.axes[axis].ticks) {
                axisGen = axisGen.ticks(options.axes[axis].ticks);
            }
            if (options.axes[axis].tickFormat) {
                axisGen = axisGen.tickFormat(options.axes[axis].tickFormat);
            }
            return axisGen;
        };
        CdLineChartService.prototype.definePosition = function (options, drawSettings, svg) {
            var tickSize = options.legend.tickSize || 4;
            var legendPosition = options.legend.position ? options.legend.position : 'bottom';
            var isTop = 0;
            var legendVerticalOffset = options.legend.vOffset || 0;
            var legendHorizontalOffset = options.legend.hOffset || 0;
            drawSettings.positionDetails = {
                xAxisVerticalShift: (options.height - this.padding + tickSize),
                xAxisHorizontalShift: 0,
                yAxisVerticalShift: 0,
                yAxisHorizontalShift: this.padding,
                legendHorizontalShift: legendHorizontalOffset + this.padding,
                legendVerticalShift: getLegendPositions(legendPosition, this) + legendVerticalOffset,
                yRangeMax: isTop ? this.padding : (this.legendRectSize + this.legendSpacing)
            };
            function getLegendPositions(legendPosition, service) {
                // If the legend is positioned at bottom shift the legend down the height of the svg (we'll expand the viewport to include the legend)
                var legendVerticalShift = 0;
                var legendHeight = getLegendHeight(service);
                if (legendPosition === 'bottom') {
                    svg.attr('viewBox', '0 0 ' + options.width + ' ' + (options.height + legendHeight));
                    legendVerticalShift = options.height;
                }
                if (legendPosition === 'top') {
                    legendVerticalShift = -1 * legendHeight;
                    svg.attr('viewBox', '0 ' + legendVerticalShift + ' ' + options.width + ' ' + (options.height + legendHeight));
                }
                return legendVerticalShift;
            }
            function getLegendHeight(service) {
                var legendUnit = service.legendRectSize + service.legendSpacing * 2;
                return (options.series) ? options.series.length * legendUnit : legendUnit;
            }
        };
        CdLineChartService.prototype.drawLegend = function (legend, data, options, drawSettings) {
            legend
                .attr('transform', function () { return 'translate(' + drawSettings.positionDetails.legendHorizontalShift + ',' + drawSettings.positionDetails.legendVerticalShift + ')'; });
            if (options.legend.enabled === false) {
                legend.selectAll('.legend').attr('style', 'display: none;');
                return;
            }
            var legendUnit = this.legendRectSize + this.legendSpacing * 2;
            // Re-position legend
            legend = legend.selectAll('.legend')
                .attr('style', 'display: block;');
            legend
                .data(options.series)
                .enter()
                .append('g')
                .attr('class', 'legend')
                .attr('transform', function (d, i, nodes) {
                // shift the legend blocks
                var increment = legendUnit;
                var yOffset = (i * increment);
                var xOffset = 0;
                return 'translate(' + xOffset + ',' + yOffset + ')';
            });
            if (options.legend.events) {
                legend.call(this.attachListenters, options.legend.events, options.events.bind);
            }
            legend
                .call(addLegendRectangles, this)
                .call(addLegendText, this);
            function addLegendText(legend, service) {
                legend.append('text')
                    .text(function (d) { return d.label; })
                    .attr('x', service.legendRectSize + 2 * service.legendSpacing)
                    .attr('y', service.legendRectSize);
            }
            function addLegendRectangles(legend, service) {
                legend.append('rect')
                    .attr('width', service.legendRectSize)
                    .attr('height', service.legendRectSize)
                    .attr('stroke', function (d) {
                    return d.color;
                })
                    .attr('fill', function (d) {
                    return d.color;
                })
                    .attr('x', 0)
                    .attr('y', 0);
            }
        };
        CdLineChartService.prototype.prepareOptions = function (svg, data, options, drawSettings) {
            var xAxis = drawSettings.xAxis ? svg.select('.xAxis') : svg.append('g').attr('class', 'xAxis');
            drawSettings.xAxis = xAxis
                .attr('transform', 'translate(' + drawSettings.positionDetails.xAxisHorizontalShift + ',' + drawSettings.positionDetails.xAxisVerticalShift + ')');
            var yAxis = drawSettings.yAxis ? svg.select('.yAxis') : svg.append('g').attr('class', 'yAxis');
            drawSettings.yAxis = yAxis
                .attr('transform', 'translate(' + drawSettings.positionDetails.yAxisHorizontalShift + ', ' + drawSettings.positionDetails.yAxisVerticalShift + ')');
            if (options.legend.enabled !== false) {
                var legend = drawSettings.legend ? svg.select('.legendGroup') : svg.append('g').attr('class', 'legendGroup');
                drawSettings.legend = legend
                    .attr('transform', function (d, i) {
                    var horz = drawSettings.positionDetails.legendHorizontalShift;
                    var vert = drawSettings.positionDetails.legendVerticalShift;
                    return 'translate(' + horz + ',' + vert + ')';
                });
            }
            // collect line paths and dots (if present) for each series
            if (!drawSettings.dotSets)
                drawSettings.dotSets = [];
            if (!drawSettings.paths)
                drawSettings.paths = [];
            // create and store d3 selector for each set
            options.series.forEach(function (series, index) {
                if (!drawSettings.paths[index])
                    drawSettings.paths[index] = svg.append('path').attr('class', 'line' + index);
                if (!drawSettings.dotSets[index])
                    drawSettings.dotSets[index] = svg.append('g').attr('class', 'circles' + index);
            });
        };
        CdLineChartService.prototype.drawSeries = function (svg, dataset, options, drawSettings, index) {
            // grab series info from the options object
            var series = options.series[index];
            var xAccessor = drawSettings.xAccessor;
            // adjust the yAccessor based on the given series
            var yAccessor = series.yKey ? this.createAccessor(series.yKey) : drawSettings.yAccessor;
            if (options.tooltip.enabled !== false)
                drawSettings.tip = this.createTooltip(svg, options, drawSettings, yAccessor);
            var line = svg.select('.line' + index);
            if (options.animation.type !== 'none')
                line = line.transition();
            line
                .call(animateLine)
                .call(styleLine);
            var circles = svg.select('.circles' + index)
                .selectAll('circle')
                .data(dataset);
            // remove old dots
            circles.exit().remove();
            // combine dataset to include only remaining selection
            circles = circles.enter()
                .append('circle')
                .merge(circles);
            circles
                .call(styleCircles)
                .call(this.attachListenters, this.events, options.events.bind);
            function animateLine(line) {
                if (options.animation.type === 'none')
                    return;
                line
                    .delay(options.animation.delay || 0)
                    .duration(options.animation.duration || 250);
            }
            function styleLine(line) {
                line
                    .attr('d', drawSettings.lineFun(yAccessor)(dataset))
                    .attr('stroke', series.color)
                    .attr('fill', 'none');
            }
            function styleCircles(circles) {
                circles
                    .attr('cx', function (d, i, n) {
                    return drawSettings.xScale(drawSettings.xAccessor(d, i, n));
                })
                    .attr('cy', function (d, i, n) { return drawSettings.yScale(yAccessor(d, i, n)); })
                    .attr('fill', series.color)
                    .attr('stroke', series.color)
                    .attr('r', series.dotSize || 2.5);
                // make dot invisible if they are not drawn for this series
                // dots remain present to provide an anchor for the tooltip
                if (series.drawDots === false) {
                    circles
                        .attr('style', 'opacity:0;')
                        .attr('r', 5);
                }
            }
        };
        CdLineChartService.prototype.draw = function (svg, data, options, drawSettings) {
            if (!options.events)
                options.events = {};
            // define your wrapper function for x and y axes
            drawSettings.xAccessor = this.createAccessor(options.axes.x.key, 'xAxis accessor');
            drawSettings.yAccessor = this.createAccessor(options.axes.y.key, 'yAxis accessor');
            // draw legend
            this.drawLegend(drawSettings.legend, data, options, drawSettings);
            // get minimum and maximum from provided options or calculate
            var yMin = this.getMinY(data, options, drawSettings.yAccessor);
            var yMax = this.getMaxY(data, options, drawSettings.yAccessor);
            var xMin = this.getMinX(data, options, drawSettings.xAccessor);
            var xMax = this.getMaxX(data, options, drawSettings.xAccessor);
            var xScaleType = options.axes.x.scaleType ? this.scaleMap[options.axes.x.scaleType] : d3.scaleLinear();
            drawSettings.xScale = xScaleType
                .domain([xMin, xMax])
                .range([(drawSettings.positionDetails.xAxisHorizontalShift + this.padding), (options.width - this.padding)]);
            var yScaleType = options.axes.y.scaleType ? this.scaleMap[options.axes.y.scaleType] : d3.scaleLinear();
            drawSettings.yScale = yScaleType
                .domain([yMin, yMax])
                .range([drawSettings.positionDetails.xAxisVerticalShift, drawSettings.positionDetails.yRangeMax]);
            drawSettings.lineFun = function (yAccessor) { return d3.line()
                .x(function (d, i, n) { return drawSettings.xScale(drawSettings.xAccessor(d, i, n)); })
                .y(function (d, i, n) { return drawSettings.yScale(yAccessor(d, i, n)); })
                .curve(d3.curveLinear); }; // should add future option to define curve type
            var xAxisGen = this.createAxes(drawSettings.xScale, options, 'bottom', 'x');
            var yAxisGen = this.createAxes(drawSettings.yScale, options, 'left', 'y');
            var xAxis = svg.select('.xAxis').call(xAxisGen);
            var yAxis = svg.select('.yAxis').call(yAxisGen);
        };
        return CdLineChartService;
    }(CdCharts.DrawService));
    CdCharts.CdLineChartService = CdLineChartService;
    angular.module('cedrus.ui.components.chart')
        .factory('lineChartService', function () { return new CdLineChartService(); });
})(CdCharts || (CdCharts = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CdCharts;
(function (CdCharts) {
    var CdPieChartService = (function (_super) {
        __extends(CdPieChartService, _super);
        function CdPieChartService() {
            return _super.call(this) || this;
        }
        CdPieChartService.prototype.prepareOptions = function (svg, data, options, drawSettings) {
            var countAccessor = this.createAccessor(options.countProperty, 'countProperty');
            var positionDetails = drawSettings.positionDetails;
            drawSettings.pieGroup = drawSettings.pieGroup || svg
                .append('g')
                .attr('transform', 'translate(' + positionDetails.pieHorizontalShift + ',' + positionDetails.pieVerticalShift + ')');
            drawSettings.pie = drawSettings.pie || d3.pie()
                .value(function (d) { return countAccessor(d); })
                .sort(function (a, b) { return countAccessor(b) - countAccessor(a); });
            drawSettings.arc = drawSettings.arc || d3.arc()
                .innerRadius(positionDetails.innerRadius)
                .outerRadius(positionDetails.radius);
            drawSettings.color = drawSettings.color || options.color || d3.scaleOrdinal(d3.schemeCategory20);
            drawSettings.legend = drawSettings.legend || svg.append('g')
                .attr('class', 'legendGroup')
                .attr('transform', function () {
                return 'translate(' + positionDetails.legendHorizontalShift + ',' + positionDetails.legendVerticalShift + ')';
            });
        };
        ;
        CdPieChartService.prototype.definePosition = function (options, drawSettings, svg) {
            var radius = Math.min(options.width, options.height) / 2;
            var donutWidth = options.donutWidth || (options.height / 5);
            var innerRadius = radius - donutWidth;
            drawSettings.positionDetails = {
                radius: radius,
                donutWidth: donutWidth,
                innerRadius: radius - donutWidth,
                pieVerticalShift: options.height / 2,
                pieHorizontalShift: options.width / 2,
                legendHorizontalShift: getLegendHorizontalShift(options, svg),
                legendVerticalShift: getLegendVerticalShift(options, svg),
                legendWidth: getLegendWidth()
            };
            function getLegendVerticalShift(options, svg) {
                if (options.legend.position === 'bottom') {
                    svg.attr('viewBox', '0 0 ' + options.width + ' ' + (20 + options.height + getLegendWidth()));
                    return options.height + 20;
                }
                if (options.legend.position === 'center')
                    return getDefaultHorizontalShift();
                if (options.legend.position === 'right')
                    return getDefaultHorizontalShift();
                if (!options.legend.position || options.legend.position === 'left')
                    return getDefaultHorizontalShift();
                if (options.legend.position === 'top') {
                    svg.attr('viewBox', '0 ' + -1 * (20 + options.height) + ' ' + options.width + ' ' + (20 + 2 * options.height));
                    return -1 * (20 + getLegendWidth());
                }
            }
            function getDefaultHorizontalShift() {
                return radius - (radius - donutWidth) / Math.sqrt(2);
            }
            function getLegendHorizontalShift(options, svg) {
                if (options.legend && options.legend.enabled !== false) {
                    if (!options.legend.position || options.legend.position === 'left') {
                        svg.attr('viewBox', -1 * (getLegendWidth()) + ' 0 ' + ((options.width) + getLegendWidth()) + ' ' + options.height);
                        return -1 * (getLegendWidth());
                    }
                    if (options.legend.position === 'right') {
                        svg.attr('viewBox', '0 0 ' + ((options.width) + getLegendWidth()) + ' ' + options.height);
                        return options.width - 20;
                    }
                }
                return radius - (radius - donutWidth) / Math.sqrt(2);
            }
            function getLegendWidth() {
                return (radius - donutWidth) * 2 / Math.sqrt(2);
            }
        };
        ;
        CdPieChartService.prototype.drawLegend = function (svg, data, options, drawSettings) {
            if (!options.legend)
                options.legend = {};
            if (options.legend.enabled === false)
                return;
            var legendDiameter = (2 * drawSettings.positionDetails.innerRadius) / Math.sqrt(2);
            var legendUnit = legendDiameter / data.length;
            var legendSpacing = legendUnit / 3;
            var legendRectSize = legendUnit - legendSpacing;
            var legend = drawSettings.legend.selectAll('g.legend').data(data);
            // remove extraneous elements
            legend.exit().remove();
            // append a 'g' element for each new legend label
            var legendEnter = legend.enter()
                .append('g')
                .attr('class', 'legend');
            // Append text and rect elements to each 'g' element
            legendEnter.append('rect');
            legendEnter.append('text');
            // merge the incoming elements with leftover elements
            legend = legendEnter.merge(legend);
            // decorate text and rect properties of the nested elements
            var widestTextEl;
            if (options.legend.events)
                legend.call(this.attachListenters, options.legend.events, options.events.bind);
            legend
                .call(addLegendText, this)
                .call(addLegendRectangle, this)
                .call(positionLegendElements, this);
            function addLegendText(legend, service) {
                legend.select('text')
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing / 2)
                    .text(function (d, i, n) {
                    return drawSettings.labelAccessor(d, i, n);
                })
                    .call(function (selection) {
                    var textEls = selection._groups[0];
                    widestTextEl = d3.max(textEls, function (textEl) { return textEl.getBBox().width; });
                });
            }
            function addLegendRectangle(legend, service) {
                legend.select('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', function (d, i, n) { return drawSettings.color(drawSettings.labelAccessor(d, i, n)); })
                    .style('stroke', function (d, i, n) { return drawSettings.color(drawSettings.labelAccessor(d, i, n)); });
            }
            function positionLegendElements(legend, service) {
                // (re)center location of legend 'g' elements
                legend.attr('transform', function (d, i) {
                    var height = legendRectSize + legendSpacing;
                    var horz = (drawSettings.positionDetails.legendWidth - (widestTextEl + legendRectSize)) / 2;
                    var vert = i * height + legendSpacing;
                    return 'translate(' + horz + ',' + vert + ')';
                });
            }
        };
        CdPieChartService.prototype.drawSeries = function (svg, data, options, drawSettings) {
            this.drawLegend(svg, data, options, drawSettings);
            var path = drawSettings.pieGroup.selectAll('path')
                .data(drawSettings.pie(data));
            path.exit().remove();
            path = path.enter()
                .append('path')
                .merge(path);
            path
                .call(animatePathEls)
                .call(stylePathEls);
            if (options.events)
                path.call(this.attachListenters, this.events, options.events.bind);
            function stylePathEls(path) {
                path
                    .attr('fill', function (d, i) { return drawSettings.color(drawSettings.labelAccessor(d.data, i)); })
                    .attr('stroke', function (d, i) { return drawSettings.color(drawSettings.labelAccessor(d.data, i)); });
            }
            function animatePathEls(path) {
                if (!options.animation)
                    options.animation = {};
                if (options.animation !== 'none') {
                    var animation = path.transition();
                    if (options.animation.duration)
                        animation.duration(options.animation.duration);
                    if (options.animation.delay)
                        animation.delay(options.animation.delay);
                    animation.attrTween('d', function (d) {
                        var interpolate = d3.interpolate(this._current, d);
                        this._current = interpolate(0);
                        return function (t) {
                            return drawSettings.arc(interpolate(t));
                        };
                    });
                }
            }
        };
        CdPieChartService.prototype.draw = function (svg, data, options, drawSettings) {
            drawSettings.countAccessor = this.createAccessor(options.countProperty, 'countProperty');
            drawSettings.labelAccessor = this.createAccessor(options.labelProperty, 'labelProperty');
            if (!options.events)
                options.events = {};
            if ((options.tooltip && options.tooltip.enabled !== false) || !options.tooltip)
                drawSettings.tip = this.createTooltip(svg, options, drawSettings, drawSettings.countAccessor);
        };
        return CdPieChartService;
    }(CdCharts.DrawService));
    CdCharts.CdPieChartService = CdPieChartService;
    angular.module('cedrus.ui.components.chart')
        .factory('pieChartService', function () { return new CdPieChartService(); });
})(CdCharts || (CdCharts = {}));

var cedrus;
(function (cedrus) {
    var ui;
    (function (ui) {
        var components;
        (function (components) {
            var dateRangePicker;
            (function (dateRangePicker) {
                var DateRangePickerController = (function () {
                    DateRangePickerController.$inject = ["$q", "$element"];
                    function DateRangePickerController($q, $element) {
                        this.$q = $q;
                        this.$element = $element;
                        this.today = new Date();
                        this.defaultOptions = {
                            useDateRange: false,
                            layout: 'row',
                            hideIcons: undefined,
                            toggleLink: {
                                show: true,
                                align: 'left'
                            },
                            startDate: {
                                rangePlaceholder: 'Date From',
                                singleDatePlaceholder: 'Date'
                            },
                            endDate: {
                                placeholder: 'Date To'
                            },
                            errorMessages: {
                                startRequired: 'Start Date is required',
                                endRequired: 'To Date is required',
                                required: 'Date is required'
                            }
                        };
                    }
                    DateRangePickerController.prototype.$onInit = function () {
                        var model = angular.extend({}, this.ngModel.$modelValue);
                        this.$startInputContainer = this.$element.find('.startDate');
                        this.options = angular.extend({}, this.defaultOptions, this.options);
                        this.options.errorMessages = angular.extend({}, this.defaultOptions.errorMessages, this.options.errorMessages);
                        if (this.form) {
                            this.parentForm = this.form.$$parentForm;
                        }
                        ;
                        this.parentFormSubmitted = false;
                        this.useDateRange = !!this.options.useDateRange;
                    };
                    DateRangePickerController.prototype.$onChanges = function (changes) {
                        if (changes.ngModel && !changes.ngModel.isFirstChange()) {
                            if (typeof changes.ngModel.currentValue.$modelValue !== 'object' || Array.isArray(changes.ngModel.currentValue.$modelValue)) {
                                console.error('ngModel needs to be an empty object or with these properties {startDate, endDate}');
                            }
                        }
                    };
                    DateRangePickerController.prototype.dateChanged = function () {
                        if (this.ngChange)
                            this.ngChange();
                    };
                    // click function that toggles daterange on/off and runa
                    DateRangePickerController.prototype.toggleDateRange = function (form) {
                        if (this.useDateRange) {
                            this.useDateRange = false;
                            this.endDate = undefined;
                            form.startDate.$setPristine();
                            form.$$parentForm.$submitted = false;
                            this.ngModel.$modelValue.endDate = null;
                            form.endDate.$setPristine();
                            this.$startInputContainer.removeClass('md-datepicker-invalid');
                        }
                        else {
                            // console.log(this.form.endDate);
                            this.useDateRange = true;
                        }
                    };
                    DateRangePickerController.prototype.getToggleDateRangeText = function (useDateRange) {
                        return useDateRange ?
                            'Use Single Date' :
                            'Use Date Range';
                    };
                    DateRangePickerController.prototype.startPlaceholder = function (useDateRange) {
                        return useDateRange ?
                            this.options.startDate.rangePlaceholder :
                            this.options.startDate.singleDatePlaceholder;
                    };
                    // need to put in cd-form-on-change directive
                    DateRangePickerController.prototype.formOnChange = function (form) {
                        if (form && this.parentForm) {
                            this.parentFormSubmitted = this.parentForm.$submitted;
                        }
                    };
                    DateRangePickerController.prototype.shouldRequire = function (section) {
                        // required flage false
                        if (!this.options.required)
                            return false;
                        var modelValue = this.ngModel.$modelValue;
                        // apply rules for date range
                        if (this.useDateRange) {
                            // require true and require both dates is true
                            if (this.options.requireBothDates)
                                return true;
                            else
                                return !modelValue.startDate && !modelValue.endDate;
                        }
                        else
                            return true;
                    };
                    return DateRangePickerController;
                }());
                DateRangePickerController.$inject = ['$q', '$element'];
                angular
                    .module('cedrus.ui.components.dateRangePicker')
                    .controller('CdDateRangePicker', DateRangePickerController);
            })(dateRangePicker = components.dateRangePicker || (components.dateRangePicker = {}));
        })(components = ui.components || (ui.components = {}));
    })(ui = cedrus.ui || (cedrus.ui = {}));
})(cedrus || (cedrus = {}));

var CdgroupedBarChart;
(function (CdgroupedBarChart) {
    var GroupedBarChartController = (function () {
        function GroupedBarChartController() {
            this.groupDataKeys = [];
            this.groupData = {};
            this.totalKeys = 0;
            this.expandedField = [];
            this.groups = {};
            this.groupKeys = [];
            this.dataLength = this.data.length;
        }
        GroupedBarChartController.prototype.$onInit = function () {
            (this.options.colors && this.options.colors.list) ? this.colors = this.options.colors.list : this.colors = ['red', 'blue', 'lightblue', 'grey', 'black'];
            this.generateGroups();
        };
        GroupedBarChartController.prototype.getColor = function (index, group) {
            group = group.toLowerCase();
            if (this.options.colors && this.options.colors.bindings && this.options.colors.bindings[group]) {
                return this.options.colors.bindings[group];
            }
            return this.colors[index % this.colors.length];
        };
        GroupedBarChartController.prototype.expandField = function (group) {
            return this.expandedField.indexOf(group) !== -1;
        };
        GroupedBarChartController.prototype.setExpandedField = function (group, remove) {
            if (remove) {
                this.expandedField.splice(this.expandedField.indexOf(group), 1);
            }
            else {
                this.expandedField.push(group);
            }
        };
        GroupedBarChartController.prototype.generateGroups = function () {
            this.data.forEach(function (dataPoint, idx) {
                // check to see if for example dueDate field exists on that el
                if (dataPoint[this.options.groupingField]) {
                    // if there is a value for dueDate field on that el
                    var groupingKey;
                    // check if theres a function to make a custom group name
                    // if not use the field name
                    if (this.options.transform) {
                        groupingKey = this.options.transform(dataPoint);
                    }
                    else {
                        groupingKey = dataPoint[this.options.groupingField];
                    }
                    if (!this.groups[groupingKey]) {
                        this.groups[groupingKey] = [];
                    }
                    this.groups[groupingKey].push(dataPoint);
                    this.totalKeys++;
                }
            }.bind(this));
            this.groupKeys = Object.keys(this.groups);
            angular.copy(this.groupKeys, this.groupDataKeys);
            angular.copy(this.groups, this.groupData);
        };
        GroupedBarChartController.prototype.showData = function () {
            if (this.data.length !== this.dataLength) {
                this.generateGroups();
            }
            this.dataLength = this.data.length;
            return this.data.length !== 0;
        };
        return GroupedBarChartController;
    }());
    angular
        .module('cedrus.ui.components.cdGroupedBarChart')
        .controller('groupedBarChartController', GroupedBarChartController);
})(CdgroupedBarChart || (CdgroupedBarChart = {}));

var cedrus;
(function (cedrus) {
    var ui;
    (function (ui) {
        var components;
        (function (components) {
            var sidebarFilter;
            (function (sidebarFilter) {
                var SidebarFilterController = (function () {
                    function SidebarFilterController() {
                        var _this = this;
                        this.classDefaults = {
                            group: 'cdFilterGroupLevel',
                            filter: 'cdFilterFilterLevel',
                            option: 'cdFilterOptionLevel',
                        };
                        // Construct Filter Tree based on user input options
                        this.setDefaults = function () {
                            _this.filters = angular.copy(_this.options.defaultFilterOptions);
                            _this.filterGroups = angular.copy(_this.options.defaultFilterGroups);
                            // Generate currentFilter object
                            var filters = {};
                            for (var group in _this.filters) {
                                filters[group] = {};
                                for (var filter in _this.filters[group]) {
                                    if (_this.filters[group][filter].type === 'checkbox') {
                                        filters[group][filter] = [];
                                    }
                                    else {
                                        var customField = _this.customFields[_this.filters[group][filter].type];
                                        if (customField.valuesStoredAs === 'object')
                                            filters[group][filter] = {};
                                        else if (customField.valuesStoredAs === 'array')
                                            filters[group][filter] = [];
                                    }
                                }
                            }
                            ;
                            _this.options.currentFilters = filters;
                            if (_this.options.customClasses) {
                                if (_this.options.customClasses.groupLevel) {
                                    if (typeof _this.options.customClasses.groupLevel === 'string') {
                                        _this.groupLevelClasses = _this.classDefaults.group + ' ' + _this.options.customClasses.groupLevel;
                                    }
                                }
                                if (_this.options.customClasses.filterLevel) {
                                    if (typeof _this.options.customClasses.filterLevel === 'string') {
                                        _this.filterLevelClasses = _this.classDefaults.filter + ' ' + _this.options.customClasses.filterLevel;
                                    }
                                }
                                if (_this.options.customClasses.optionLevel) {
                                    if (typeof _this.options.customClasses.optionLevel === 'string') {
                                        _this.optionLevelClasses = _this.classDefaults.option + ' ' + _this.options.customClasses.optionLevel;
                                    }
                                }
                            }
                        };
                        this.changeFilter = function (filter, optionName, index) {
                            /* the name of the filter being applied */
                            var filterName = filter.name;
                            /* Filter Group that this filter belongs to */
                            var group = filter.group;
                            /* Object of options objects for this filter keyed by name */
                            var filterOptions = filter.options;
                            /* the option being updated */
                            var updatedOption = filter.options[optionName];
                            /* the state of the current filter within the filter holder */
                            var currentFilterOption = _this.options.currentFilters[group][filterName];
                            var changedFilter = {
                                group: group,
                                filterName: filterName,
                                updatedOption: updatedOption.value,
                                isSelected: updatedOption.isSelected
                            };
                            /* Add or remove the filter to the currentFilters object */
                            if (filter.type === 'checkbox') {
                                _this.options.currentFilters[group][filterName] = checkboxHandler(currentFilterOption, updatedOption);
                            }
                            else {
                                _this.options.currentFilters[group][filterName] = _this.customFields[filter.type].handler(currentFilterOption, updatedOption, filter);
                            }
                            /* User passed function that will handle event emission and handling in a custom manner */
                            if (typeof _this.options.filterChanged === 'function') {
                                _this.options.filterChanged(_this.options.currentFilters, changedFilter);
                            }
                        };
                        this.groupLevelClasses = this.classDefaults.group;
                        this.filterLevelClasses = this.classDefaults.filter;
                        this.optionLevelClasses = this.classDefaults.option;
                    }
                    SidebarFilterController.prototype.$onInit = function () {
                        this.setDefaults();
                    };
                    SidebarFilterController.prototype.$onChanges = function (changes) {
                        var optionsChange = changes && changes.options && !changes.options.isFirstChange();
                        var customFieldsChange = changes && changes.customFields && !changes.customFields.isFirstChange();
                        // Reset filter and trigger filter change function
                        if (optionsChange || customFieldsChange) {
                            this.setDefaults();
                            if (typeof this.options.filterChanged === 'function') {
                                this.options.filterChanged(this.options.currentFilters);
                            }
                        }
                    };
                    SidebarFilterController.prototype.toggleExpand = function (filterOption) {
                        if (filterOption.isExpanded === undefined)
                            filterOption.isExpanded = true;
                        filterOption.isExpanded = !filterOption.isExpanded;
                    };
                    SidebarFilterController.prototype.processTitle = function (option, level) {
                        if (typeof option.title === 'string')
                            return option.title;
                        else if (typeof option.title === 'function') {
                            return option.title(option, level);
                        }
                        else
                            return option.value;
                    };
                    return SidebarFilterController;
                }());
                SidebarFilterController.$inject = [];
                var TitleTypes;
                (function (TitleTypes) {
                    TitleTypes[TitleTypes["GROUP"] = 0] = "GROUP";
                    TitleTypes[TitleTypes["FILTER"] = 1] = "FILTER";
                    TitleTypes[TitleTypes["OPTION"] = 2] = "OPTION";
                })(TitleTypes || (TitleTypes = {}));
                angular
                    .module('cedrus.ui.components.sidebarFilter')
                    .controller('SidebarFilterController', SidebarFilterController);
            })(sidebarFilter = components.sidebarFilter || (components.sidebarFilter = {}));
        })(components = ui.components || (ui.components = {}));
    })(ui = cedrus.ui || (cedrus.ui = {}));
})(cedrus || (cedrus = {}));
function checkboxHandler(currentFilterOption, updatedOption) {
    if (updatedOption.isSelected) {
        currentFilterOption.push(updatedOption.value);
    }
    else {
        var index = currentFilterOption.indexOf(updatedOption.value);
        if (index > -1) {
            currentFilterOption.splice(index, 1);
        }
    }
    return currentFilterOption;
}

/**
 * @ngdoc module
 * @name cedrus.ui.components.export
 * @description
 */
/**
 * @ngdoc type
 * @name workbookOptions
 * @module cedrus.ui.components.export
 * @description
 * A reference to a export worksheet option. This reference contains a unique id for the
 * panel, along with the following properties:
 *
 *   - `columnWidth` - `{number}`: sets default column width for the cells of the workbook, can be overridden.
 *   - `cellDates` - `{boolean}`: boolen flag, defaults to false whether or not to use date parsers
 */
var CdWorksheetExport;
(function (CdWorksheetExport) {
    /* @ngInject */
    var WorksheetExportService = (function () {
        WorksheetExportService.$inject = ["$filter"];
        function WorksheetExportService($filter) {
            this.$filter = $filter;
        }
        WorksheetExportService.prototype.s2ab = function (s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i < s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        };
        WorksheetExportService.prototype.generateSheet = function (sheetData, name, options) {
            var worksheet = {};
            var range = {
                s: {
                    c: 0,
                    r: 0
                },
                e: {
                    c: sheetData.headers.length,
                    r: 0
                }
            };
            for (var H = 0; H < sheetData.headers.length; H++) {
                var headerCell = {
                    v: sheetData.headers[H].title,
                    t: 's'
                };
                var headerCellRef = XLSX.utils.encode_cell({ c: H, r: 0 });
                worksheet[headerCellRef] = headerCell;
            }
            // loop through data and encode each cell
            for (var R = 0; R < sheetData.data.length; R++) {
                // The first row is filled with the header info so cellRow number is R + 1
                var cellRow = R + 1;
                // increase # of rows in range if dataset extends it so that it will be included in output
                if (range.e.r < cellRow) {
                    range.e.r = cellRow;
                }
                // loop through columns within a given row and extract data
                for (var C = 0; C < sheetData.headers.length; C++) {
                    // create object to hold cell data.  default cell type is number
                    var cell = {};
                    // create address for cell
                    var cellRef = XLSX.utils.encode_cell({ c: C, r: cellRow });
                    // set cell value depending on type indicated in the headers currently only string or number supported
                    if (sheetData.headers[C].type)
                        cell.t = sheetData.headers[C].type;
                    // if a cell value is not provided default the cell to zero
                    var value = sheetData.data[R][sheetData.headers[C].key];
                    cell.v = (value != null) ? value : '';
                    // place the now completed cell at the calculated address
                    worksheet[cellRef] = cell;
                }
            }
            // set column widths (15 is default)
            worksheet['!cols'] = sheetData.headers.map(function (header) {
                if (!header.columnWidth)
                    header.columnWidth = options.columnWidth || 15;
                return {
                    wch: header.columnWidth
                };
            });
            worksheet['!ref'] = XLSX.utils.encode_range(range);
            return {
                sheetName: name,
                sheet: worksheet
            };
        };
        WorksheetExportService.prototype.generateWorkbook = function (dataSheets, filename, options) {
            var _this = this;
            if (!options)
                options = {};
            // override default options if provided
            options = angular.extend({
                bookType: 'xlsx',
                bookSST: false,
                type: 'binary'
            }, options);
            var workbook = {
                Sheets: {},
                Props: {},
                SSF: {},
                SheetNames: []
            };
            // if user provided a single worksheet wrap it in an Array
            if (!Array.isArray(dataSheets))
                dataSheets = [dataSheets];
            // loop through each set of sheet data, generate the sheet and add it to the workbook
            dataSheets.forEach(function (sheetData, index) {
                var sheetName = sheetData.sheetName || 'sheet ' + index;
                var sheet = _this.generateSheet(sheetData, sheetName, options);
                workbook.SheetNames.push(sheet.sheetName);
                workbook.Sheets[sheet.sheetName] = sheet.sheet;
            });
            this.exportWorkbook(workbook, options, filename);
        };
        WorksheetExportService.prototype.exportWorkbook = function (workbook, options, filename) {
            workbook = XLSX.write(workbook, options);
            workbook = this.s2ab(workbook);
            var blob = new Blob([workbook]);
            this.saveAs(blob, filename);
        };
        WorksheetExportService.prototype.saveAs = function (blob, filename) {
            // TODO: switch to $window and $document, if possible
            var link = document.createElement('a');
            var url = window.URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.setAttribute('style', 'display: none');
            link.href = url;
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        };
        return WorksheetExportService;
    }());
    /* @ngInject */
    WorksheetExportService.$inject = ['$filter'];
    angular
        .module('cedrus.ui.components.export', [])
        .service('cdWorksheetExportService', WorksheetExportService);
})(CdWorksheetExport || (CdWorksheetExport = {}));

angular.module('cedrus.ui').run(['$templateCache', function($templateCache) {$templateCache.put('components/calendar/calendar.tpl.html','<div class="container"><div class="hider" ng-click="vm.displayCal()" ng-show="vm.showCal"></div><div class="input-blocker" ng-click="vm.displayCal()" readonly="true"></div><input type="text" class="md-select" ng-model="vm.selection"><div ng-show="vm.showCal" class="panel"><div class="md-whiteframe-2dp"><div class="yearrow" layout="row" layout-align="space-between end"><md-button class="calbtn" ng-click="vm.setYear(-1)" ng-hide="vm.yearSel" aria-label="previous year"><i class="fa fa-chevron-left"></i></md-button><md-button class="calbtn" ng-click="vm.setYear(-12)" ng-show="vm.yearSel" aria-label="go back one page"><i class="fa fa-chevron-left"></i></md-button><md-button class="calbtn yearbtn" ng-click="vm.flipCal()" aria-label="swap between month and year select">{{vm.date.selYear || vm.initYear}}</md-button><md-button class="calbtn" ng-click="vm.setYear(1)" ng-hide="vm.yearSel" aria-label="next year"><i class="fa fa-chevron-right"></i></md-button><md-button class="calbtn" ng-click="vm.setYear(12)" ng-show="vm.yearSel" aria-label="go forward by one page"><i class="fa fa-chevron-right"></i></md-button></div><div layout="row" ng-repeat="monthRow in vm.monthMap" ng-hide="vm.yearSel"><md-button class="calbtn monthSelect" ng-repeat="month in monthRow" ng-click="vm.setMonth(month.value)" aria-label="choose {{month.value}}">{{month.display}}</md-button></div><div layout="row" ng-repeat="yearRow in vm.yearMap" ng-show="vm.yearSel"><md-button class="calbtn yearSelect" ng-repeat="year in yearRow" ng-click="vm.flipCal(); vm.setYear(year)" aria-label="choose {{year}}">{{(vm.date.selYear||vm.initYear)+year}}</md-button></div></div></div></div>');
$templateCache.put('components/date-range-picker/date-range-picker.tpl.html','<div class="cd-date-range-picker" layout="column"><form name="vm.form" class="ng-cloak" layout="{{ ::vm.options.layout }}"><md-datepicker name="startDate" ng-model="vm.ngModel.$modelValue.startDate" ng-required="vm.shouldRequire(\'startDate\')" md-placeholder="{{ vm.startPlaceholder(vm.useDateRange) }}" md-min-date="vm.options.startDate.min || false" md-max-date="vm.ngModel.$modelValue.endDate || vm.options.startDate.max || false" ng-change="vm.dateChanged()" ng-model-options="vm.ngModelOptions" class="startDate" ng-class="{\n                        \'hide-all\' : vm.options.hideIcons == \'all\',\n                        \'hide-calendar\' : vm.options.hideIcons == \'calendar\',\n                        \'hide-triangle\' : vm.options.hideIcons == \'triangle\'\n                    }"></md-datepicker><md-datepicker name="endDate" ng-model="vm.ngModel.$modelValue.endDate" ng-required="vm.shouldRequire(\'endDate\')" ng-if="vm.useDateRange" md-placeholder="{{ vm.options.endDate.placeholder }}" md-min-date="vm.ngModel.$modelValue.startDate" md-max-date="vm.options.endDate.max" ng-change="vm.dateChanged()" ng-model-options="vm.ngModelOptions" class="endDate" ng-class="{\n                        \'hidden\': !vm.useDateRange,\n                        \'hide-all\' : vm.options.hideIcons == \'all\',\n                        \'hide-calendar\' : vm.options.hideIcons == \'calendar\',\n                        \'hide-triangle\' : vm.options.hideIcons == \'triangle\'\n                    }" ng-cloak></md-datepicker></form><span flex><a ng-if="(vm.options.toggleLink) ? vm.options.toggleLink.show : true" class="toggle-link" ng-class="{ \'float-right\':  vm.options.toggleLink.align == \'right\',\n                               \'float-left\':  vm.options.toggleLink.align == \'left\'}" ng-click="vm.toggleDateRange(vm.form)">{{ vm.getToggleDateRangeText(vm.useDateRange) }}</a></span><div class="error-div" ng-if="vm.form.$error && vm.form.$dirty"><span ng-if="vm.form.startDate.$error.required">{{ vm.useDateRange ? vm.options.errorMessages.startRequired : vm.options.errorMessages.required }} </span><span ng-if="vm.form.endDate.$error.required">{{ vm.options.errorMessages.endRequired }}</span></div></div>');
$templateCache.put('components/grouped-bar-chart/grouped-bar-chart.tpl.html','<div class="cd-grouped-bar-chart"><div ng-hide="vm.showData()"><div layout="row" layout-fill layout-align="center center" class="no-data"><span>There are no active tasks.</span></div></div><div ng-show="vm.showData()"><div ng-repeat="group in vm.groupDataKeys"><div layout="row" class="group-item"><div layout="column"><md-icon ng-hide="vm.expandField(group)" md-font-icon="fa fa-caret-right" ng-click="vm.setExpandedField(group)" ng-if="vm.options.subFields"></md-icon><md-icon ng-show="vm.expandField(group)" md-font-icon="fa fa-caret-down" ng-click="vm.setExpandedField(group, true)" ng-if="vm.options.subFields"></md-icon></div><div layout="column" flex><div layout="row" layout-align="space-around none"><div flex="60" layout-align="start center">{{group}}</div><div flex="20">Count: {{vm.groupData[group].length}}</div><div flex="20">{{vm.groupData[group].length*100/vm.totalKeys | number:0}}%</div></div></div></div><div layout="row" flex class="line-color"><div ng-style="{width:vm.groupData[group].length*100/vm.totalKeys + \'%\', \'background\': vm.getColor($index, group)}" class="red-line"></div></div><div class="data-container" ng-show="vm.expandField(group)"><div layout="column" ng-show="vm.expandField(group)" ng-if="vm.options.subFields"><div ng-repeat="el in vm.groupData[group]"><div ng-include="vm.options.extendedTemplate || \'lineChartSingleItemExpanded\'"></div></div></div></div></div><div layout="row" layout-align="end none" class="total">Total Count:{{vm.totalKeys}}</div></div></div><script type="text/ng-template" id="lineChartSingleItemExpanded"><div class="panel" layout="column" layout-align="center none">\n        <div layout="row" layout-align="space-between none" class="data-row">\n            <div ng-repeat="(field, displayText ) in vm.options.subFields">\n                <span class="bold-text">{{displayText}}</span>\n                <span>{{el[field]}}</span>\n            </div>\n        </div>\n    </div></script>');
$templateCache.put('components/sidebar-filter/sidebar-filter.tpl.html','<!--implemenation for user provided custom type/templates--><!--change naming to filter-tree, side-filter towards end--><div class="cd-sidebar-filter"><div ng-repeat="group in vm.filterGroups track by $index" ng-class="(vm.groupLevelClasses + (group.customClass ? \' \' + group.customClass : \'\') )"><div ng-if="!vm.options.isFlat"><md-button ng-click="vm.toggleExpand(group)" class="md-icon-button" aria-label="expand"><md-icon md-font-set="fa" md-font-icon="fa-chevron-right" ng-class="(group.isExpanded  !== false )? \'fa-chevron-down\': \'fa-chevron-right\'"></md-icon></md-button><span>{{ ::vm.processTitle(group, 0) }}</span></div><ul ng-show="group.isExpanded !== false" layout="column" ng-repeat="(filterName, filter) in vm.filters[group.key] track by filterName" ng-class="(vm.filterLevelClasses + (filter.customClass ? \' \' + filter.customClass : \'\'))" ng-class="{ cdFilterFlat : vm.options.isFlat}"><li><div><md-button ng-click="vm.toggleExpand(filter)" class="md-icon-button" aria-label="expand"><md-icon md-font-set="fa" md-font-icon="fa-chevron-right" ng-class="(filter.isExpanded  !== false )? \'fa-chevron-down\': \'fa-chevron-right\'"></md-icon></md-button><span>{{::vm.processTitle(filter, 1)}}</span><ul ng-show="filter.isExpanded !== false"><div ng-if="filter.type === \'checkbox\'" ng-include="\'cdCheckBoxFilter\'"></div><div ng-if="filter.type !== \'checkbox\'" ng-include="vm.customFields[filter.type].template"></div></ul></div></li></ul></div></div><script type="text/ng-template" id="cdCheckBoxFilter"><li ng-repeat="(optionName, option) in filter.options track by optionName" ng-class="(vm.optionLevelClasses + (option.customClass ? \' \' + option.customClass : \'\'))">\n        <md-checkbox ng-model="option.isSelected" ng-change="vm.changeFilter(filter, optionName, $index)" class="md-primary" ng-model-options="{debounce: 250}"\n            aria-label="{{::vm.processTitle(option, 2)}}">\n            <span>{{::vm.processTitle(option, 2)}}</span>\n        </md-checkbox>\n    </li></script>');}]);
})(window, window.angular);;window.cedrusUI={version:{full: "0.4.2"}};