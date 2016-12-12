/*!
 * Cedrus UI
 * https://github.com/cedrusco/cedrus-ui
 * @license Copyright Cedrus 2015
 * v0.2.19
 */
(function( window, angular, undefined ){
"use strict";

(function(){
"use strict";

angular.module('cedrus.ui', ["ng","ngAnimate","ngAria","cedrus.ui.core"]);
})();
(function(){
"use strict";

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

})();
(function(){
"use strict";

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

})();
(function(){
"use strict";

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
        .filter('capitalize', Utils.capitalize);
})(Core || (Core = {}));

})();
(function(){
"use strict";

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
        .factory('$cedrusConstant', function () { return new CedrusConstantFactory(); });
})(Core || (Core = {}));

})();
(function(){
"use strict";

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
        .filter('normalizeCamelCase', Utils.normalizeCamelCase);
})(Core || (Core = {}));

})();
(function(){
"use strict";

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

})();
(function(){
"use strict";

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
                args[_i - 0] = arguments[_i];
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

})();
(function(){
"use strict";

angular.module('cedrus.ui').run(['$templateCache', function($templateCache) {$templateCache.put('components/calendar/calendar.tpl.html','<div class="container"><div class="hider" ng-click="vm.displayCal()" ng-show="vm.showCal"></div><div class="input-blocker" ng-click="vm.displayCal()" readonly="true"></div><input type="text" class="md-select" ng-model="vm.selection"><div ng-show="vm.showCal" class="panel"><div class="md-whiteframe-2dp"><div class="yearrow" layout="row" layout-align="space-between end"><md-button class="calbtn" ng-click="vm.setYear(-1)" ng-hide="vm.yearSel" aria-label="previous year"><i class="fa fa-chevron-left"></i></md-button><md-button class="calbtn" ng-click="vm.setYear(-12)" ng-show="vm.yearSel" aria-label="go back one page"><i class="fa fa-chevron-left"></i></md-button><md-button class="calbtn yearbtn" ng-click="vm.flipCal()" aria-label="swap between month and year select">{{vm.date.selYear || vm.initYear}}</md-button><md-button class="calbtn" ng-click="vm.setYear(1)" ng-hide="vm.yearSel" aria-label="next year"><i class="fa fa-chevron-right"></i></md-button><md-button class="calbtn" ng-click="vm.setYear(12)" ng-show="vm.yearSel" aria-label="go forward by one page"><i class="fa fa-chevron-right"></i></md-button></div><div layout="row" ng-repeat="monthRow in vm.monthMap" ng-hide="vm.yearSel"><md-button class="calbtn monthSelect" ng-repeat="month in monthRow" ng-click="vm.setMonth(month.value)" aria-label="choose {{month.value}}">{{month.display}}</md-button></div><div layout="row" ng-repeat="yearRow in vm.yearMap" ng-show="vm.yearSel"><md-button class="calbtn yearSelect" ng-repeat="year in yearRow" ng-click="vm.flipCal(); vm.setYear(year)" aria-label="choose {{year}}">{{(vm.date.selYear||vm.initYear)+year}}</md-button></div></div></div></div>');
$templateCache.put('components/date-range-picker/date-range-picker.tpl.html','<div ng-form="vm.form"><md-datepicker name="startDate" ng-model="vm.startDate" ng-change="vm.onDatepickerChange(vm.startDate, vm.endDate)" ng-required="vm.shouldRequire(vm.useDateRange, vm.endDate)" md-placeholder="{{ vm.startPlaceholder(vm.useDateRange) }}" md-min-date="vm.options.startDate.min || false" md-max-date="vm.endDate || vm.options.startDate.max || false" class="startDate"></md-datepicker><md-datepicker ng-show="vm.useDateRange" name="endDate" ng-model="vm.endDate" ng-change="vm.onDatepickerChange(vm.startDate, vm.endDate)" ng-required="vm.shouldRequire(vm.useDateRange, vm.startDate)" md-placeholder="{{ vm.options.endDate.placeholder }}" md-min-date="vm.startDate" md-max-date="vm.options.endDate.max" class="last-datepicker"></md-datepicker></div><a ng-click="vm.toggleDateRange(vm.form)">{{ vm.getToggleDateRangeText(vm.useDateRange) }}</a><div class="error-div" ng-if="vm.useDateRange && vm.form.$error && vm.parentFormSubmitted"><span ng-if="vm.form.startDate.$error.required">{{ vm.options.errorMessages.startRequired }} </span><span ng-if="vm.form.endDate.$error.required">{{ vm.options.errorMessages.endRequired }}</span></div>');
$templateCache.put('components/grouped-bar-chart/grouped-bar-chart.tpl.html','<div class="cd-grouped-bar-chart"><div ng-hide="vm.showData()"><div layout="row" layout-fill layout-align="center center" class="no-data"><span>There are no active tasks.</span></div></div><div ng-show="vm.showData()"><div ng-repeat="group in vm.groupDataKeys"><div layout="row" class="group-item"><div layout="column"><md-icon ng-hide="vm.expandField(group)" md-font-icon="fa fa-caret-right" ng-click="vm.setExpandedField(group)" ng-if="vm.options.subFields"></md-icon><md-icon ng-show="vm.expandField(group)" md-font-icon="fa fa-caret-down" ng-click="vm.setExpandedField(group, true)" ng-if="vm.options.subFields"></md-icon></div><div layout="column" flex><div layout="row" layout-align="space-around none"><div flex="60" layout-align="start center">{{group}}</div><div flex="20">Count: {{vm.groupData[group].length}}</div><div flex="20">{{vm.groupData[group].length*100/vm.totalKeys | number:0}}%</div></div></div></div><div layout="row" flex class="line-color"><div ng-style="{width:vm.groupData[group].length*100/vm.totalKeys + \'%\', \'background\': vm.getColor($index, group)}" class="red-line"></div></div><div class="data-container" ng-show="vm.expandField(group)"><div layout="column" ng-show="vm.expandField(group)" ng-if="vm.options.subFields"><div ng-repeat="el in vm.groupData[group]"><div ng-include="vm.options.extendedTemplate || \'lineChartSingleItemExpanded\'"></div></div></div></div></div><div layout="row" layout-align="end none" class="total">Total Count:{{vm.totalKeys}}</div></div></div><script type="text/ng-template" id="lineChartSingleItemExpanded"><div class="panel" layout="column" layout-align="center none">\n        <div layout="row" layout-align="space-between none" class="data-row">\n            <div ng-repeat="(field, displayText ) in vm.options.subFields">\n                <span class="bold-text">{{displayText}}</span>\n                <span>{{el[field]}}</span>\n            </div>\n        </div>\n    </div></script>');
$templateCache.put('components/sidebar-filter/sidebar-filter.tpl.html','<!--implemenation for user provided custom type/templates--><!--change naming to filter-tree, side-filter towards end--><div class="cd-sidebar-filter"><div ng-repeat="group in vm.filterGroups track by $index" ng-class="(vm.groupLevelClasses + (group.customClass ? \' \' + group.customClass : \'\') )"><div ng-if="!vm.options.isFlat"><md-button ng-click="vm.toggleExpand(group)" class="md-icon-button" aria-label="expand"><md-icon md-font-set="fa" md-font-icon="fa-chevron-right" ng-class="(group.isExpanded  !== false )? \'fa-chevron-down\': \'fa-chevron-right\'"></md-icon></md-button><span>{{ ::vm.processTitle(group, 0) }}</span></div><ul ng-show="group.isExpanded !== false" layout="column" ng-repeat="(filterName, filter) in vm.filters[group.key] track by filterName" ng-class="(vm.filterLevelClasses + (filter.customClass ? \' \' + filter.customClass : \'\'))" ng-class="{ cdFilterFlat : vm.options.isFlat}"><li><div><md-button ng-click="vm.toggleExpand(filter)" class="md-icon-button" aria-label="expand"><md-icon md-font-set="fa" md-font-icon="fa-chevron-right" ng-class="(filter.isExpanded  !== false )? \'fa-chevron-down\': \'fa-chevron-right\'"></md-icon></md-button><span>{{::vm.processTitle(filter, 1)}}</span><ul ng-show="filter.isExpanded !== false"><div ng-if="filter.type === \'checkbox\'" ng-include="\'cdCheckBoxFilter\'"></div><div ng-if="filter.type !== \'checkbox\'" ng-include="vm.customFields[filter.type].template"></div></ul></div></li></ul></div></div><script type="text/ng-template" id="cdCheckBoxFilter"><li ng-repeat="(optionName, option) in filter.options track by optionName" ng-class="(vm.optionLevelClasses + (option.customClass ? \' \' + option.customClass : \'\'))">\n        <md-checkbox ng-model="option.isSelected" ng-change="vm.changeFilter(filter, optionName, $index)" class="md-primary" ng-model-options="{debounce: 250}"\n            aria-label="{{::vm.processTitle(option, 2)}}">\n            <span>{{::vm.processTitle(option, 2)}}</span>\n        </md-checkbox>\n    </li></script>');}]);
})();
})(window, window.angular);;window.cedrusUI={version:{full: "0.2.19"}};