/*!
 * Cedrus UI
 * https://github.com/cedrusco/cedrus-ui
 * @license Copyright Cedrus 2015-2016
 * v0.2.0
 */
(function( window, angular, undefined ){
"use strict";

(function(){
"use strict";

angular.module('cedrus.ui', ["ngMaterial","ngAnimate","cedrus.ui.components.linechart"]);
})();
(function(){
"use strict";

(function () {
    angular
        .module('cedrus.ui.components.linechart', [])
        .component('lineChart', lineChart());
    function lineChart() {
        var cdo = {
            bindings: {
                data: '=',
                options: '='
            },
            templateUrl: 'components/line-chart/line.chart.tpl.html',
            controller: 'LineChartController',
            controllerAs: 'vm',
            transclude: true
        };
        return cdo;
    }
})();

})();
(function(){
"use strict";

angular.module('cedrus.ui').run(['$templateCache', function($templateCache) {$templateCache.put('components/bar-chart/bar-chart.tpl.html','<div id="container"><svg id="chart"></svg><div></div></div>');
$templateCache.put('components/calendar/calendar.tpl.html','<div class="container"><div class="hider" ng-click="vm.displayCal()" ng-show="vm.showCal"></div><div class="input-blocker" ng-click="vm.displayCal()" readonly="true"></div><input type="text" class="md-select" ng-model="vm.selection"><div ng-show="vm.showCal" class="panel"><div class="md-whiteframe-2dp"><div class="yearrow" layout="row" layout-align="space-between end"><md-button class="calbtn" ng-click="vm.setYear(-1)" ng-hide="vm.yearSel" aria-label="previous year"><i class="fa fa-chevron-left"></i></md-button><md-button class="calbtn" ng-click="vm.setYear(-12)" ng-show="vm.yearSel" aria-label="go back one page"><i class="fa fa-chevron-left"></i></md-button><md-button class="calbtn yearbtn" ng-click="vm.flipCal()" aria-label="swap between month and year select">{{vm.date.selYear || vm.initYear}}</md-button><md-button class="calbtn" ng-click="vm.setYear(1)" ng-hide="vm.yearSel" aria-label="next year"><i class="fa fa-chevron-right"></i></md-button><md-button class="calbtn" ng-click="vm.setYear(12)" ng-show="vm.yearSel" aria-label="go forward by one page"><i class="fa fa-chevron-right"></i></md-button></div><div layout="row" ng-repeat="monthRow in vm.monthMap" ng-hide="vm.yearSel"><md-button class="calbtn monthSelect" ng-repeat="month in monthRow" ng-click="vm.setMonth(month.value)" aria-label="choose {{month.value}}">{{month.display}}</md-button></div><div layout="row" ng-repeat="yearRow in vm.yearMap" ng-show="vm.yearSel"><md-button class="calbtn yearSelect" ng-repeat="year in yearRow" ng-click="vm.flipCal(); vm.setYear(year)" aria-label="choose {{year}}">{{(vm.date.selYear||vm.initYear)+year}}</md-button></div></div></div></div>');
$templateCache.put('components/grouped-bar-chart/grouped-bar-chart.tpl.html','<div class="cd-grouped-bar-chart"><div ng-hide="vm.showData()"><div layout="row" layout-fill layout-align="center center" class="no-data"><span>There are no active tasks.</span></div></div><div ng-show="vm.showData()"><div ng-repeat="group in vm.groupDataKeys"><div layout="row" class="group-item"><div layout="column"><md-icon ng-hide="vm.expandField(group)" md-font-icon="fa fa-caret-right" ng-click="vm.setExpandedField(group)" ng-if="vm.options.subFields"></md-icon><md-icon ng-show="vm.expandField(group)" md-font-icon="fa fa-caret-down" ng-click="vm.setExpandedField(group, true)" ng-if="vm.options.subFields"></md-icon></div><div layout="column" flex><div layout="row" layout-align="space-around none"><div flex="60" layout-align="start center">{{group}}</div><div flex="20">Count: {{vm.groupData[group].length}}</div><div flex="20">{{vm.groupData[group].length*100/vm.totalKeys | number:0}}%</div></div></div></div><div layout="row" flex class="line-color"><div ng-style="{width:vm.groupData[group].length*100/vm.totalKeys + \'%\', \'background\': vm.getColor($index, group)}" class="red-line"></div></div><div class="data-container" ng-show="vm.expandField(group)"><div layout="column" ng-show="vm.expandField(group)" ng-if="vm.options.subFields"><div ng-repeat="el in vm.groupData[group]"><div ng-include="vm.options.extendedTemplate || \'lineChartSingleItemExpanded\'"></div></div></div></div></div><div layout="row" layout-align="end none" class="total">Total Count:{{vm.totalKeys}}</div></div></div><script type="text/ng-template" id="lineChartSingleItemExpanded"><div class="panel" layout="column" layout-align="center none">\n        <div layout="row" layout-align="space-between none" class="data-row">\n            <div ng-repeat="(field, displayText ) in vm.options.subFields">\n                <span class="bold-text">{{displayText}}</span>\n                <span>{{el[field]}}</span>\n            </div>\n        </div>\n    </div></script>');}]);
})();
})(window, window.angular);;window.cedrusUI={version:{full: "0.2.0"}};