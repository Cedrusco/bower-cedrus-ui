/*!
 * Cedrus UI
 * https://github.com/cedrusco/cedrus-ui
 * @license Copyright Cedrus 2015-2016
 * v0.2.2
 */
(function( window, angular, undefined ){
"use strict";

(function(){
"use strict";

angular.module('cedrus.ui', ["ngMaterial","ngAnimate","cedrus.ui.core","cedrus.ui.components.cdBarChart","cedrus.ui.components.calendar","cedrus.ui.components.cdChart","cedrus.ui.components.cdGroupedBarChart","cedrus.ui.components.cdLineChart","cedrus.ui.components.linechart","cedrus.ui.components.cdPieChart"]);
})();
(function(){
"use strict";

var Core;
(function (Core) {
    angular
        .module('cedrus.ui.core', ['ngMaterial']);
})(Core || (Core = {}));

})();
(function(){
"use strict";

var Core;
(function (Core) {
    function cedrusCoreConfigure($provide, $cedrusUIConfigProvider, $mdThemingProvider) {
        $cedrusUIConfigProvider.setDefaultDateFormat('MM/dd/yyyy');
    }
    cedrusCoreConfigure.$inject = ["$provide", "$cedrusUIConfigProvider", "$mdThemingProvider"];
    angular
        .module('cedrus.ui.core')
        .config(cedrusCoreConfigure);
})(Core || (Core = {}));

})();
(function(){
"use strict";

var Core;
(function (Core) {
    function capitalize(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        function capitalizeWord(word) {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        }
        return (!!input) ? input.replace(reg, capitalizeWord) : '';
    }
    angular
        .module('cedrus.ui.core')
        .filter('capitalize', function () { return capitalize; });
})(Core || (Core = {}));

})();
(function(){
"use strict";

var Core;
(function (Core) {
    var CedrusConstantFactory = (function () {
        function CedrusConstantFactory() {
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

var Core;
(function (Core) {
    function normalizeCamelCase(input, capitalizeFirst) {
        var result = input.replace(/([a-z])([A-Z])/g, '$1 $2');
        return result;
    }
    angular
        .module('cedrus.ui.core')
        .filter('normalizeCamelCase', function () { return normalizeCamelCase; });
})(Core || (Core = {}));

})();
(function(){
"use strict";

var Core;
(function (Core) {
    var UIConfigProvider = (function () {
        function UIConfigProvider() {
            this._UI_DEFAULT_DATE_FORMAT = 'MM/dd/yyyy';
            this.dateFormat = this._UI_DEFAULT_DATE_FORMAT;
        }
        UIConfigProvider.prototype.$get = function () {
            return {
                getDateFormat: this.getDefaultDateFormat
            };
        };
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

var Core;
(function (Core) {
    var UtilFactory = (function () {
        function UtilFactory() {
            this.isDebug = true;
            this.now = window.performance ?
                angular.bind(window.performance, window.performance.now) : Date.now || function () {
                return new Date().getTime();
            };
        }
        UtilFactory.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (window['isDebug']) {
                console.debug.apply(console, ['Cedrus UI:'].concat(args));
            }
        };
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

var CdBarChart;
(function (CdBarChart) {
    var BarChartComponent = (function () {
        function BarChartComponent() {
            this.bindings = {
                data: '<',
                options: '<'
            };
            this.templateUrl = 'components/bar-chart/bar-chart.tpl.html';
            this.controller = 'BarChartController';
            this.controllerAs = 'vm';
        }
        return BarChartComponent;
    }());
    angular
        .module('cedrus.ui.components.cdBarChart', [])
        .component('cdBarChart', new BarChartComponent());
})(CdBarChart || (CdBarChart = {}));

})();
(function(){
"use strict";

var CdBarChart;
(function (CdBarChart) {
    var BarChartController = (function () {
        function BarChartController() {
            this.data = [];
            this.options = {};
            this.margin = { top: 30, right: 30, bottom: 40, left: 80 };
            this.height = 400 - this.margin.top - this.margin.bottom;
            this.width = 600 - this.margin.left - this.margin.right;
            this.barWidth = 50;
            this.barOffset = 5;
        }
        BarChartController.prototype.Draw = function (data) {
            var _this = this;
            if (!this.svg)
                return;
            if (!data.length) {
                return;
            }
            var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d[_this.yAxisOption]; })]).range([0, this.height]);
            var xScale = d3.scaleBand().domain(data.map(function (d) { return d[_this.xAxisOption]; })).rangeRound([0, this.width]).paddingInner(0.05).paddingOuter(0.05);
            var colorsop1 = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d[_this.yAxisOption]; })]).range(['#FFB832', '#C61C6F']);
            var colorsop2 = d3.scaleLinear().domain([0, data.length]).range(['#FFB832', '#C61C6F']);
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function (d) {
                return "<strong>" + _this.yAxisOption + ":</strong> <span> " + d[_this.yAxisOption] + " </span>";
            });
            this.svg.call(tip);
            var rect = this.svg.selectAll('rect').data(data);
            rect.enter().append('rect').merge(rect).style('fill', function (d, i) { return colorsop2(i); })
                .attr('width', function (d) { return xScale.bandwidth(); })
                .attr('height', 0)
                .attr('x', function (d) { return xScale(d[_this.xAxisOption]); })
                .attr('y', this.height)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .transition()
                .attr('height', function (d) { return yScale(d[_this.yAxisOption]); })
                .attr('y', function (d) { return _this.height - yScale(d[_this.yAxisOption]); })
                .delay(function (d, i) { return i * 20; })
                .duration(1000);
            var vGuideScale = d3.scaleLinear().domain([0, d3.max(this.data, function (d) { return d[_this.yAxisOption]; })]).range([this.height, 0]);
            var vAxis = d3.axisLeft(vGuideScale).ticks(10);
            vAxis(this.vGuide);
            this.vGuide.attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
            var hAxis = d3.axisBottom(xScale);
            hAxis(this.hGuide);
            this.hGuide.attr('transform', 'translate(' + this.margin.left + ',' + (this.height + this.margin.top) + ')');
            rect.exit().remove();
        };
        BarChartController.prototype.$onInit = function () {
            this.xAxisOption = this.options.xaxis;
            this.yAxisOption = this.options.yaxis;
            this.svg = d3.select('#chart')
                .attr('width', this.width + this.margin.left + this.margin.right)
                .attr('height', this.height + this.margin.top + this.margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
            this.hGuide = d3.select('#chart').append('g');
            this.vGuide = d3.select('#chart').append('g');
            this.Draw(this.data);
        };
        BarChartController.prototype.$onChanges = function (changeObj) {
            this.xAxisOption = this.options.xaxis;
            this.yAxisOption = this.options.yaxis;
            this.Draw(this.data);
        };
        return BarChartController;
    }());
    angular
        .module('cedrus.ui.components.cdBarChart')
        .controller('BarChartController', BarChartController);
})(CdBarChart || (CdBarChart = {}));

})();
(function(){
"use strict";

var CdCalendar;
(function (CdCalendar) {
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
    angular
        .module('cedrus.ui.components.calendar', [])
        .component('cdCalendar', new CalendarComponent());
})(CdCalendar || (CdCalendar = {}));

})();
(function(){
"use strict";

var CdCalendar;
(function (CdCalendar) {
    var CalendarController = (function () {
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
        CalendarController.$inject = ['$element'];
        return CalendarController;
    }());
    angular
        .module('cedrus.ui.components.calendar')
        .controller('CalendarController', CalendarController);
})(CdCalendar || (CdCalendar = {}));

})();
(function(){
"use strict";

var CdCharts;
(function (CdCharts) {
    var CdChartComponent = (function () {
        function CdChartComponent() {
            this.bindings = {
                data: '<',
                options: '<'
            };
            this.template = '<svg></svg>';
            this.controller = 'CdChartController';
            this.controllerAs = 'vm';
        }
        return CdChartComponent;
    }());
    angular
        .module('cedrus.ui.components.cdChart', [])
        .component('cdChart', new CdChartComponent());
})(CdCharts || (CdCharts = {}));

})();
(function(){
"use strict";

var CdCharts;
(function (CdCharts) {
    var CdChartController = (function () {
        function CdChartController($element, $injector) {
            this.$element = $element;
            this.$injector = $injector;
            this.defaultOptions = {
                width: 360,
                height: 360,
            };
            this.options = angular.merge({}, this.defaultOptions, this.options);
            this.width = this.options.width;
            this.height = this.options.height;
            this.svg = d3.select(this.$element[0]).select('svg')
                .attr('width', this.width)
                .attr('height', this.height);
            this.chartService = this.$injector.get(this.options.chartType + 'Service');
        }
        CdChartController.prototype.$onInit = function () {
            this.drawChart();
        };
        CdChartController.prototype.$onChanges = function (changeObj) {
            this.drawChart();
        };
        CdChartController.prototype.drawChart = function () {
            if (!this.data.length)
                return;
            this.chartService.draw(this.svg, this.data, this.options);
        };
        CdChartController.$inject = ['$element', '$injector'];
        return CdChartController;
    }());
    angular
        .module('cedrus.ui.components.cdChart')
        .controller('CdChartController', CdChartController);
})(CdCharts || (CdCharts = {}));

})();
(function(){
"use strict";

var CdCharts;
(function (CdCharts) {
    var CdLineChartService = (function () {
        function CdLineChartService() {
            this.tableBuilt = false;
            this.padding = 20;
            this.getDate = function (d) {
                return new Date(d);
            };
        }
        CdLineChartService.prototype.draw = function (svg, data, options) {
            var _this = this;
            var width = options.width;
            var height = options.height;
            if (!this.tableBuilt) {
                this.svg = svg;
                this.path = this.svg.append('path')
                    .attr('class', 'line');
                this.circles = this.svg.append('g')
                    .attr('class', 'circles');
                this.xAxis = this.svg.append('g')
                    .attr('transform', 'translate(0,' + (height - this.padding) + ')')
                    .attr('class', 'xAxis');
                this.yAxis = this.svg.append('g')
                    .attr('class', 'yAxis')
                    .attr('transform', 'translate(' + (this.padding + 20) + ', 0)');
                this.tableBuilt = true;
            }
            var xAxisProperty = options.xAxisProp;
            var yAxisProperty = options.yAxisProp;
            var minDate = this.getDate(data[0][xAxisProperty]);
            var maxDate = this.getDate(data[data.length - 1][xAxisProperty]);
            var xScale = d3.scaleLinear()
                .domain([minDate, maxDate])
                .range([this.padding + 20, width - this.padding]);
            var yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return parseInt(d[yAxisProperty]); })])
                .range([height - this.padding, 10]);
            var lineFun = d3.line()
                .x(function (d) { return xScale(_this.getDate(d[xAxisProperty])); })
                .y(function (d) { return yScale(d[yAxisProperty]); })
                .curve(d3.curveLinear);
            var xAxisGen = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat('%Y'));
            var yAxisGen = d3.axisLeft().scale(yScale).ticks(5);
            svg.selectAll('.line')
                .transition()
                .attr('d', lineFun(data))
                .attr('stroke', 'purple')
                .attr('fill', 'none');
            var circles = svg.select('.circles')
                .selectAll('circle')
                .data(data, function (d) {
                return d;
            });
            circles.enter()
                .append('circle')
                .merge(circles)
                .attr('cx', function (d, i) {
                return xScale(_this.getDate(d[xAxisProperty]));
            })
                .attr('cy', function (d) { return yScale(d[yAxisProperty]); })
                .attr('fill', 'purple')
                .attr('stroke', 'purple')
                .attr('r', 3.5);
            circles.exit().remove();
            svg.select('.xAxis').call(xAxisGen);
            svg.select('.yAxis').call(yAxisGen);
        };
        return CdLineChartService;
    }());
    angular.module('cedrus.ui.components.cdChart')
        .factory('lineChartService', function () { return new CdLineChartService(); });
})(CdCharts || (CdCharts = {}));

})();
(function(){
"use strict";

var CdCharts;
(function (CdCharts) {
    var CdPieChartService = (function () {
        function CdPieChartService() {
            this.tableBuilt = false;
        }
        CdPieChartService.prototype.draw = function (svg, data, options) {
            function myClickFun(d, i, n) {
                options.clickFun(d, i, n);
            }
            var radius = Math.min(options.width, options.height) / 2;
            var donutWidth = options.height / 5;
            var countProp = options.countProp;
            var labelProp = options.labelProp;
            var width = options.width;
            var height = options.height;
            var legendRectSize = donutWidth / 4;
            var legendSpacing = legendRectSize / 4;
            if (!this.tableBuilt) {
                this.svg = svg
                    .append('g')
                    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
                this.pie = d3.pie()
                    .value(function (d) { return d[countProp]; })
                    .sort(function (a, b) { return b[countProp] - a[countProp]; });
                this.tableBuilt = true;
                this.arc = d3.arc()
                    .innerRadius(radius - donutWidth)
                    .outerRadius(radius);
                this.color = d3.scaleOrdinal(d3.schemeCategory20);
            }
            data = data.sort(function (a, b) { return b[countProp] - a[countProp]; });
            svg = this.svg;
            var pie = this.pie;
            var arc = this.arc;
            var color = this.color;
            var path = svg.selectAll('path')
                .data(pie(data));
            path.exit().remove();
            path = path.enter()
                .append('path')
                .merge(path)
                .attr('fill', function (d, i) { return color(d.data[labelProp]); });
            if (options.clickFun) {
                path.on('click', function (d, i, n) { myClickFun(d, i, n); });
            }
            path.transition()
                .duration(750)
                .attrTween('d', function (d) {
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    return arc(interpolate(t));
                };
            });
            var legend = svg.selectAll('g.legend')
                .data(data);
            legend.exit().remove();
            var legendEnter = legend.enter()
                .append('g')
                .attr('class', 'legend');
            legendEnter.append('rect');
            legendEnter.append('text');
            var merged = legendEnter.merge(legend);
            merged.attr('transform', function (d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = height * data.length / 2;
                var horz = -2 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });
            merged.select('text')
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing)
                .text(function (d) { return d[labelProp]; });
            merged.select('rect')
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .style('fill', function (d) { return color(d[labelProp]); })
                .style('stroke', function (d) { return color(d[labelProp]); });
        };
        return CdPieChartService;
    }());
    angular.module('cedrus.ui.components.cdChart')
        .factory('pieChartService', function () { return new CdPieChartService(); });
})(CdCharts || (CdCharts = {}));

})();
(function(){
"use strict";

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

})();
(function(){
"use strict";

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
                if (dataPoint[this.options.groupingField]) {
                    var groupingKey;
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

})();
(function(){
"use strict";

var CdLineChart;
(function (CdLineChart) {
    var CdLineChartComponent = (function () {
        function CdLineChartComponent() {
            this.template = '<svg></svg>';
            this.controller = 'cdLineChartController';
            this.controllerAs = 'this';
            this.bindings = {
                data: '<',
                options: '<'
            };
        }
        return CdLineChartComponent;
    }());
    angular.module('cedrus.ui.components.cdLineChart', [])
        .component('cdLineChart', new CdLineChartComponent());
})(CdLineChart || (CdLineChart = {}));

})();
(function(){
"use strict";

var CdLineChart;
(function (CdLineChart) {
    var CdLineChartController = (function () {
        function CdLineChartController($element) {
            this.$element = $element;
            this.padding = 20;
            this.getDate = function (d) {
                return new Date(d);
            };
        }
        CdLineChartController.prototype.$onInit = function () {
            this.width = this.options.width || 500;
            this.height = this.options.height || 300;
            this.graph = d3.select(this.$element[0]).select('svg')
                .attr('width', this.width)
                .attr('height', this.height);
            this.path = this.graph.append('path')
                .attr('class', 'line');
            this.circles = this.graph.append('g')
                .attr('class', 'circles');
            this.xAxis = this.graph.append('g')
                .attr('transform', 'translate(0,' + (this.height - this.padding) + ')')
                .attr('class', 'xAxis');
            this.yAxis = this.graph.append('g')
                .attr('class', 'yAxis')
                .attr('transform', 'translate(' + (this.padding + 20) + ', 0)');
            if (this.data.length) {
                this.updateGraph(this.data);
            }
        };
        CdLineChartController.prototype.$onChanges = function (changeObj) {
            if (changeObj.data.currentValue.length) {
                this.updateGraph(changeObj.data.currentValue);
            }
        };
        CdLineChartController.prototype.updateGraph = function (data) {
            var _this = this;
            var xAxisProperty = this.options.xAxis || (this.data[0] ? Object.keys(this.data[0])[0] : '');
            var yAxisProperty = this.options.yAxis || (this.data[0] ? Object.keys(this.data[0])[1] : '');
            var minDate = this.getDate(data[0][xAxisProperty]);
            var maxDate = this.getDate(data[data.length - 1][xAxisProperty]);
            var xScale = d3.scaleLinear()
                .domain([minDate, maxDate])
                .range([this.padding + 20, this.width - this.padding]);
            var yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) { return parseInt(d[yAxisProperty]); })])
                .range([this.height - this.padding, 10]);
            var lineFun = d3.line()
                .x(function (d) { return xScale(_this.getDate(d[xAxisProperty])); })
                .y(function (d) { return yScale(d[yAxisProperty]); })
                .curve(d3.curveLinear);
            var xAxisGen = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat('%Y'));
            var yAxisGen = d3.axisLeft().scale(yScale).ticks(5);
            this.graph.selectAll('.line')
                .transition()
                .attr('d', lineFun(data))
                .attr('stroke', 'purple')
                .attr('fill', 'none');
            var circles = this.graph.select('.circles')
                .selectAll('circle')
                .data(data, function (d) {
                return d;
            });
            circles.enter()
                .append('circle')
                .merge(circles)
                .attr('cx', function (d, i) {
                return xScale(_this.getDate(d[xAxisProperty]));
            })
                .attr('cy', function (d) { return yScale(d[yAxisProperty]); })
                .attr('fill', 'purple')
                .attr('stroke', 'purple')
                .attr('r', 3.5);
            circles.exit().remove();
            this.graph.select('.xAxis').call(xAxisGen);
            this.graph.select('.yAxis').call(yAxisGen);
        };
        CdLineChartController.$inject = ['$element'];
        return CdLineChartController;
    }());
    angular.module('cedrus.ui.components.cdLineChart')
        .controller('cdLineChartController', CdLineChartController);
})(CdLineChart || (CdLineChart = {}));

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

var CdPieChart;
(function (CdPieChart) {
    var CdPieChartComponenet = (function () {
        function CdPieChartComponenet() {
            this.template = '<svg></svg><style>.legend { font-size: 10px; }</style>';
            this.controller = 'cdPieChartController';
            this.controllerAs = 'vm';
            this.bindings = {
                data: '<',
                options: '<'
            };
        }
        return CdPieChartComponenet;
    }());
    angular.module('cedrus.ui.components.cdPieChart', [])
        .component('cdPieChart', new CdPieChartComponenet());
})(CdPieChart || (CdPieChart = {}));

})();
(function(){
"use strict";

var CdPieChart;
(function (CdPieChart) {
    var CdPieChartController = (function () {
        function CdPieChartController($element) {
            var _this = this;
            this.$element = $element;
            this.countProp = this.options.countProp || 'count';
            this.labelProp = this.options.labelProp || 'label';
            this.width = 360 || this.options.width;
            this.height = 360 || this.options.height;
            this.radius = Math.min(this.width, this.height) / 2;
            this.donutWidth = 75 || this.options.donutWidth;
            this.legendRectSize = 18;
            this.legendSpacing = 4;
            this.color = d3.scaleOrdinal(d3.schemeCategory20);
            this.svg = d3.select(this.$element[0]).select('svg')
                .attr('width', this.width)
                .attr('height', this.height)
                .append('g')
                .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
            this.arc = d3.arc()
                .innerRadius(this.radius - this.donutWidth)
                .outerRadius(this.radius);
            this.pie = d3.pie()
                .value(function (d) { return d[_this.countProp]; })
                .sort(function (a, b) { return b[_this.countProp] - a[_this.countProp]; });
        }
        CdPieChartController.prototype.$onInit = function () {
            if (this.data.length) {
                this.drawGraph(this.data);
            }
        };
        CdPieChartController.prototype.$onChanges = function (changeObj) {
            var _this = this;
            if (changeObj.data.currentValue.length) {
                this.data.forEach(function (d) {
                    d[_this.countProp] = +d[_this.countProp];
                    d.enabled = true;
                });
                this.drawGraph(this.data);
            }
        };
        CdPieChartController.prototype.myClickFun = function (d, i, n) {
            this.options.clickFun(d, i, n);
        };
        CdPieChartController.prototype.drawGraph = function (dataset) {
            var _this = this;
            dataset = dataset.sort(function (a, b) { return b[_this.countProp] - a[_this.countProp]; });
            var arc = this.arc;
            var path = this.svg.selectAll('path')
                .data(this.pie(dataset));
            path.exit().remove();
            path = path.enter()
                .append('path')
                .merge(path)
                .attr('fill', function (d, i) {
                return _this.color(d.data[_this.labelProp]);
            });
            if (this.options.clickFun) {
                path.on('click', function (d, i, n) { _this.myClickFun(d, i, n); });
            }
            path.transition()
                .duration(750)
                .attrTween('d', function (d) {
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function (t) {
                    return arc(interpolate(t));
                };
            });
            var legend = this.svg.selectAll('g.legend')
                .data(dataset);
            legend.exit().remove();
            var legendEnter = legend.enter()
                .append('g')
                .attr('class', 'legend');
            legendEnter.append('rect');
            legendEnter.append('text');
            var merged = legendEnter.merge(legend);
            merged.attr('transform', function (d, i) {
                var height = _this.legendRectSize + _this.legendSpacing;
                var offset = height * dataset.length / 2;
                var horz = -2 * _this.legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });
            merged.select('text')
                .attr('x', this.legendRectSize + this.legendSpacing)
                .attr('y', this.legendRectSize - this.legendSpacing)
                .text(function (d) { return d[_this.labelProp]; });
            merged.select('rect')
                .attr('width', this.legendRectSize)
                .attr('height', this.legendRectSize)
                .style('fill', function (d) { return _this.color(d[_this.labelProp]); })
                .style('stroke', function (d) { return _this.color(d[_this.labelProp]); });
        };
        CdPieChartController.$inject = ['$element'];
        return CdPieChartController;
    }());
    angular.module('cedrus.ui.components.cdPieChart')
        .controller('cdPieChartController', CdPieChartController);
})(CdPieChart || (CdPieChart = {}));

})();
(function(){
"use strict";

angular.module('cedrus.ui').run(['$templateCache', function($templateCache) {$templateCache.put('components/bar-chart/bar-chart.tpl.html','<div id="container"><svg id="chart"></svg><div></div></div>');
$templateCache.put('components/calendar/calendar.tpl.html','<div class="container"><div class="hider" ng-click="vm.displayCal()" ng-show="vm.showCal"></div><div class="input-blocker" ng-click="vm.displayCal()" readonly="true"></div><input type="text" class="md-select" ng-model="vm.selection"><div ng-show="vm.showCal" class="panel"><div class="md-whiteframe-2dp"><div class="yearrow" layout="row" layout-align="space-between end"><md-button class="calbtn" ng-click="vm.setYear(-1)" ng-hide="vm.yearSel" aria-label="previous year"><i class="fa fa-chevron-left"></i></md-button><md-button class="calbtn" ng-click="vm.setYear(-12)" ng-show="vm.yearSel" aria-label="go back one page"><i class="fa fa-chevron-left"></i></md-button><md-button class="calbtn yearbtn" ng-click="vm.flipCal()" aria-label="swap between month and year select">{{vm.date.selYear || vm.initYear}}</md-button><md-button class="calbtn" ng-click="vm.setYear(1)" ng-hide="vm.yearSel" aria-label="next year"><i class="fa fa-chevron-right"></i></md-button><md-button class="calbtn" ng-click="vm.setYear(12)" ng-show="vm.yearSel" aria-label="go forward by one page"><i class="fa fa-chevron-right"></i></md-button></div><div layout="row" ng-repeat="monthRow in vm.monthMap" ng-hide="vm.yearSel"><md-button class="calbtn monthSelect" ng-repeat="month in monthRow" ng-click="vm.setMonth(month.value)" aria-label="choose {{month.value}}">{{month.display}}</md-button></div><div layout="row" ng-repeat="yearRow in vm.yearMap" ng-show="vm.yearSel"><md-button class="calbtn yearSelect" ng-repeat="year in yearRow" ng-click="vm.flipCal(); vm.setYear(year)" aria-label="choose {{year}}">{{(vm.date.selYear||vm.initYear)+year}}</md-button></div></div></div></div>');
$templateCache.put('components/grouped-bar-chart/grouped-bar-chart.tpl.html','<div class="cd-grouped-bar-chart"><div ng-hide="vm.showData()"><div layout="row" layout-fill layout-align="center center" class="no-data"><span>There are no active tasks.</span></div></div><div ng-show="vm.showData()"><div ng-repeat="group in vm.groupDataKeys"><div layout="row" class="group-item"><div layout="column"><md-icon ng-hide="vm.expandField(group)" md-font-icon="fa fa-caret-right" ng-click="vm.setExpandedField(group)" ng-if="vm.options.subFields"></md-icon><md-icon ng-show="vm.expandField(group)" md-font-icon="fa fa-caret-down" ng-click="vm.setExpandedField(group, true)" ng-if="vm.options.subFields"></md-icon></div><div layout="column" flex><div layout="row" layout-align="space-around none"><div flex="60" layout-align="start center">{{group}}</div><div flex="20">Count: {{vm.groupData[group].length}}</div><div flex="20">{{vm.groupData[group].length*100/vm.totalKeys | number:0}}%</div></div></div></div><div layout="row" flex class="line-color"><div ng-style="{width:vm.groupData[group].length*100/vm.totalKeys + \'%\', \'background\': vm.getColor($index, group)}" class="red-line"></div></div><div class="data-container" ng-show="vm.expandField(group)"><div layout="column" ng-show="vm.expandField(group)" ng-if="vm.options.subFields"><div ng-repeat="el in vm.groupData[group]"><div ng-include="vm.options.extendedTemplate || \'lineChartSingleItemExpanded\'"></div></div></div></div></div><div layout="row" layout-align="end none" class="total">Total Count:{{vm.totalKeys}}</div></div></div><script type="text/ng-template" id="lineChartSingleItemExpanded"><div class="panel" layout="column" layout-align="center none">\n        <div layout="row" layout-align="space-between none" class="data-row">\n            <div ng-repeat="(field, displayText ) in vm.options.subFields">\n                <span class="bold-text">{{displayText}}</span>\n                <span>{{el[field]}}</span>\n            </div>\n        </div>\n    </div></script>');}]);
})();
})(window, window.angular);;window.cedrusUI={version:{full: "0.2.2"}};