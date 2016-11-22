/*!
 * Cedrus UI
 * https://github.com/cedrusco/cedrus-ui
 * @license Copyright Cedrus 2015-2016
 * v0.2.14
 */
(function( window, angular, undefined ){
"use strict";

angular.module('cedrus.ui', ["ngMaterial","ngAnimate","cedrus.ui.core","cedrus.ui.components.calendar","cedrus.ui.components.cdChart","cedrus.ui.components.cdGroupedBarChart","cedrus.ui.components.sidebarFilter","cedrus.ui.components.constant"]);
var Core;
(function (Core) {
    angular
        .module('cedrus.ui.core', ['ngMaterial']);
})(Core || (Core = {}));

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
    CdCalendar.CalendarComponent = CalendarComponent;
    angular
        .module('cedrus.ui.components.calendar', [])
        .component('cdCalendar', new CalendarComponent());
})(CdCalendar || (CdCalendar = {}));

var CdCharts;
(function (CdCharts) {
    var CdChartController = (function () {
        function CdChartController($element, $injector) {
            var _this = this;
            this.$element = $element;
            this.$injector = $injector;
            this.defaultOptions = {
                width: 360,
                height: 360
            };
            this.drawSettings = {};
            this.chartTypes = {
                'pieChart': 'pieChartService',
                'lineChart': 'lineChartService'
            };
            this.implementOverlay = function () {
                _this.element.select('.custom-overlay').html(_this.options.customHTMLoverlay());
            };
            this.drawChart = function (optionsChanged) {
                if (optionsChanged) {
                    if (_this.options.customHTMLoverlay)
                        _this.implementOverlay();
                    _this.chartService.mergeEvents(_this.options);
                    _this.chartService.definePosition(_this.options, _this.drawSettings, _this.svg);
                    _this.chartService.prepareOptions(_this.svg, _this.data, _this.options, _this.drawSettings);
                }
                _this.chartService.draw(_this.svg, _this.data, _this.options, _this.drawSettings);
                _this.options.series.forEach(function (series, index) {
                    var isVisible = series.visible !== false;
                    var dataset = isVisible ? _this.data[series['dataset']] : [];
                    _this.chartService.drawSeries(_this.svg, dataset, _this.options, _this.drawSettings, series, index);
                });
            };
            this.options = angular.merge({}, this.defaultOptions, this.options);
            this.width = this.options.width;
            this.height = this.options.height;
            this.element = d3.select(this.$element[0]);
            this.svg = d3.select(this.$element[0]).select('svg')
                .attr('width', this.width)
                .attr('height', this.height);
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
        }
        CdChartController.prototype.$onInit = function () {
            this.drawChart(true);
        };
        CdChartController.prototype.$onChanges = function (changeObj) {
            var optionsChanged = changeObj.options ? true : false;
            this.drawChart(optionsChanged);
        };
        CdChartController.$inject = ['$element', '$injector'];
        return CdChartController;
    }());
    var CdChartComponent = (function () {
        function CdChartComponent() {
            this.bindings = {
                data: '<',
                options: '<'
            };
            this.template = '<div><div class="custom-overlay"></div><svg></svg></div>';
            this.controller = CdChartController;
            this.controllerAs = 'vm';
        }
        return CdChartComponent;
    }());
    angular
        .module('cedrus.ui.components.cdChart', [])
        .component('cdChart', new CdChartComponent());
    var DrawService = (function () {
        function DrawService() {
            this.padding = 20;
            this.legendRectSize = 12;
            this.legendSpacing = 4;
            this.scaleMap = {
                linear: d3.scaleLinear(),
                log: d3.scaleLog(),
                ordinal: d3.scaleOrdinal()
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
        DrawService.prototype.createTooltip = function (svg, options, drawSettings, accessor) {
            accessor = (options.tooltip && options.tooltip.customText) ? this.createAccessor(options.tooltip.customText, 'tooltip data accessor') : accessor;
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
            drawSettings.tip = tip;
            this.events['mouseover'].push(drawSettings.tip.show);
            this.events['mouseout'].push(drawSettings.tip.hide);
        };
        DrawService.prototype.createAccessor = function (prop, propName) {
            if (!prop) {
                console.warn('Must Provide a Key for property: ' + propName);
            }
            if (typeof prop === 'function') {
                return function (d, i, n) {
                    if (propName === 'tooltip data accessor') {
                        i = d.index;
                        d = d.data;
                    }
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
                    eventMap[eventName].forEach(function (event) {
                        bind ? event.bind(_this)(d, i, n, currentEvent) : event(d, i, n, currentEvent);
                    });
                });
            });
        };
        DrawService.$inject = ['$scope'];
        return DrawService;
    }());
    CdCharts.DrawService = DrawService;
})(CdCharts || (CdCharts = {}));

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
            var xAxisProperty = options.xAxisProperty;
            var yAxisProperty = options.yAxisProperty;
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
            var yScale = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d[yAxisProperty]; })]).range([0, height]);
            var xScale = d3.scaleBand().domain(data.map(function (d) { return d[xAxisProperty]; })).rangeRound([0, width]).paddingInner(0.05).paddingOuter(0.05);
            var colorsop1 = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d[yAxisProperty]; })]).range(['#FFB832', '#C61C6F']);
            var colorsop2 = d3.scaleLinear().domain([0, data.length]).range(['#FFB832', '#C61C6F']);
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function (d) {
                return "<strong>" + yAxisProperty + ":</strong> <span> " + d[yAxisProperty] + " </span>";
            });
            svg.call(tip);
            var vGuideScale = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d[yAxisProperty]; })]).range([height, 0]);
            var xAxisGen = d3.axisLeft(vGuideScale).ticks(10);
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
            xAxisGen(this.xAxis);
            yAxisGen(this.yAxis);
            bars.exit().remove();
        };
        return CdBarChartService;
    }());
    CdCharts.CdBarChartService = CdBarChartService;
    angular.module('cedrus.ui.components.cdChart')
        .service('barChartService', CdBarChartService);
})(CdCharts || (CdCharts = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CdCharts;
(function (CdCharts) {
    var CdLineChartService = (function (_super) {
        __extends(CdLineChartService, _super);
        function CdLineChartService() {
            _super.apply(this, arguments);
        }
        CdLineChartService.prototype.getMaxY = function (data, options, yAccessor) {
            if (options.axes.y.max)
                return options.axes.y.max;
            var yMaxes = [];
            options.series.forEach(function (series, index) {
                if (series.visible === false)
                    return;
                var dataset = data[series.dataset];
                yMaxes.push(d3.max(dataset, function (datum) {
                    return parseInt(yAccessor(datum));
                }));
            });
            return d3.max(yMaxes);
        };
        CdLineChartService.prototype.getMinY = function (data, options, yAccessor) {
            return options.axes.y.min ? options.axes.y.min : 0;
        };
        CdLineChartService.prototype.getMaxX = function (data, options, xAccessor) {
            if (options.axes.max)
                return options.axes.max;
            var xMaxes = [];
            options.series.forEach(function (series, index) {
                if (series.visible === false)
                    return;
                var dataset = data[series.dataset];
                xMaxes.push(d3.max(dataset, function (datum) {
                    return xAccessor(datum);
                }));
            });
            return d3.max(xMaxes);
        };
        CdLineChartService.prototype.getMinX = function (data, options, xAccessor) {
            if (options.axes.min)
                return options.axes.min;
            var xMins = [];
            options.series.forEach(function (series, index) {
                if (series.visible === false)
                    return;
                var dataset = data[series.dataset];
                xMins.push(d3.min(dataset, function (datum) {
                    return xAccessor(datum);
                }));
            });
            return d3.min(xMins);
        };
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
        CdLineChartService.prototype.definePosition = function (options, drawSettings) {
            var tickSize = options.legend.tickSize || 4;
            var isTop = options.legend.position !== 'top';
            var legendShift = options.legend.position !== 'top' ? (this.legendRectSize + this.legendSpacing) : 0;
            var legendVerticalOffset = options.legend.vOffset || 0;
            var legendHorizontalOffset = options.legend.hOffset || 0;
            drawSettings.positionDetails = {
                xAxisVerticalShift: (options.height - this.padding + tickSize - legendShift),
                xAxisHorizontalShift: 0,
                yAxisVerticalShift: 0,
                yAxisHorizontalShift: this.padding,
                legendHorizontalShift: legendHorizontalOffset,
                legendVerticalShift: (isTop ? (options.height - this.legendRectSize) : 0) + legendVerticalOffset,
                yRangeMax: isTop ? this.padding : (this.legendRectSize + this.legendSpacing)
            };
        };
        CdLineChartService.prototype.drawLegend = function (legend, data, options, drawSettings) {
            var _this = this;
            if (options.legend.enabled === false) {
                legend.selectAll('.legend').attr('style', 'display: none;');
                return;
            }
            legend = legend.selectAll('.legend')
                .attr('style', 'display: block;')
                .data(options.series)
                .enter()
                .append('g')
                .attr('class', 'legend')
                .attr('transform', function (d, i, nodes) {
                var increment = (options.width - _this.padding * 2) / options.series.length;
                var offset = _this.padding * 2 + (i * increment);
                return 'translate(' + offset + ',' + 0 + ')';
            });
            if (options.legend.events) {
                legend.call(this.attachListenters, options.legend.events, options.events.bind);
            }
            legend.append('rect')
                .attr('width', this.legendRectSize)
                .attr('height', this.legendRectSize)
                .attr('stroke', function (d) {
                return d.color;
            })
                .attr('fill', function (d) {
                return d.color;
            })
                .attr('x', 0)
                .attr('y', 0);
            legend.append('text')
                .text(function (d) { return d.label; })
                .attr('x', (this.legendRectSize + this.legendSpacing))
                .attr('y', this.legendRectSize / 1.5);
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
            if (!drawSettings.dotSets)
                drawSettings.dotSets = [];
            if (!drawSettings.paths)
                drawSettings.paths = [];
            options.series.forEach(function (series, index) {
                if (!drawSettings.paths[index])
                    drawSettings.paths[index] = svg.append('path').attr('class', 'line' + index);
                if (!drawSettings.dotSets[index])
                    drawSettings.dotSets[index] = svg.append('g').attr('class', 'circles' + index);
            });
        };
        CdLineChartService.prototype.drawSeries = function (svg, dataset, options, drawSettings, series, index) {
            var lines = svg.select('.line' + index);
            if (options.animation.type !== 'none') {
                lines = lines.transition();
                if (options.animation.delay)
                    lines.delay(options.animation.delay);
                if (options.animation.duration)
                    lines.duration(options.animation.duration);
            }
            lines.attr('d', drawSettings.lineFun(dataset))
                .attr('stroke', series.color)
                .attr('fill', 'none');
            var circles = svg.select('.circles' + index)
                .selectAll('circle')
                .data(dataset);
            var newCircles = circles.enter()
                .append('circle')
                .merge(circles);
            newCircles.attr('cx', function (d, i, n) {
                return drawSettings.xScale(drawSettings.xAccessor(d, i, n));
            })
                .attr('cy', function (d, i, n) { return drawSettings.yScale(drawSettings.yAccessor(d, i, n)); })
                .attr('fill', series.color)
                .attr('stroke', series.color)
                .attr('r', series.dotSize || 2.5)
                .call(this.attachListenters, this.events, options.events.bind);
            if (series.drawDots === false) {
                newCircles
                    .attr('style', 'opacity:0;')
                    .attr('r', 5);
            }
            circles.exit().remove();
        };
        CdLineChartService.prototype.draw = function (svg, data, options, drawSettings) {
            if (!options.events)
                options.events = {};
            drawSettings.xAccessor = this.createAccessor(options.axes.x.key, 'xAxis accessor');
            drawSettings.yAccessor = this.createAccessor(options.axes.y.key, 'yAxis accessor');
            if (options.tooltip.enabled !== false)
                drawSettings.tip = this.createTooltip(svg, options, drawSettings, drawSettings.yAccessor);
            this.drawLegend(drawSettings.legend, data, options, drawSettings);
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
            drawSettings.lineFun = d3.line()
                .x(function (d, i, n) { return drawSettings.xScale(drawSettings.xAccessor(d, i, n)); })
                .y(function (d, i, n) { return drawSettings.yScale(drawSettings.yAccessor(d, i, n)); })
                .curve(d3.curveLinear);
            var xAxisGen = this.createAxes(drawSettings.xScale, options, 'bottom', 'x');
            var yAxisGen = this.createAxes(drawSettings.yScale, options, 'left', 'y');
            svg.select('.xAxis').call(xAxisGen);
            svg.select('.yAxis').call(yAxisGen);
        };
        return CdLineChartService;
    }(CdCharts.DrawService));
    CdCharts.CdLineChartService = CdLineChartService;
    angular.module('cedrus.ui.components.cdChart')
        .factory('lineChartService', function () { return new CdLineChartService(); });
})(CdCharts || (CdCharts = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CdCharts;
(function (CdCharts) {
    var CdPieChartService = (function (_super) {
        __extends(CdPieChartService, _super);
        function CdPieChartService() {
            _super.call(this);
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
                if (!options.legend.position || options.legend.position === 'left') {
                    svg.attr('viewBox', -1 * (getLegendWidth()) + ' 0 ' + ((options.width) + getLegendWidth()) + ' ' + options.height);
                    return -1 * (getLegendWidth());
                }
                if (options.legend.position === 'right') {
                    svg.attr('viewBox', '0 0 ' + ((options.width) + getLegendWidth()) + ' ' + options.height);
                    return options.width - 20;
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
            legend.exit().remove();
            var legendEnter = legend.enter()
                .append('g')
                .attr('class', 'legend');
            legendEnter.append('rect');
            legendEnter.append('text');
            var merged = legendEnter.merge(legend);
            var widestTextEl;
            if (options.legend.events)
                merged.call(this.attachListenters, options.legend.events, options.events.bind);
            merged.select('text')
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing / 2)
                .text(function (d, i, n) {
                return drawSettings.labelAccessor(d, i, n);
            })
                .call(function (selection) {
                var textEls = selection._groups[0];
                widestTextEl = d3.max(textEls, function (textEl) { return textEl.getBBox().width; });
            });
            merged.select('rect')
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .style('fill', function (d, i, n) { return drawSettings.color(drawSettings.labelAccessor(d, i, n)); })
                .style('stroke', function (d, i, n) { return drawSettings.color(drawSettings.labelAccessor(d, i, n)); });
            merged.attr('transform', function (d, i) {
                var height = legendRectSize + legendSpacing;
                var horz = (drawSettings.positionDetails.legendWidth - (widestTextEl + legendRectSize)) / 2;
                var vert = i * height + legendSpacing;
                return 'translate(' + horz + ',' + vert + ')';
            });
        };
        CdPieChartService.prototype.drawSeries = function (svg, data, options, drawSettings) {
            this.drawLegend(svg, data, options, drawSettings);
            var path = drawSettings.pieGroup.selectAll('path')
                .data(drawSettings.pie(data));
            path.exit().remove();
            path = path.enter()
                .append('path')
                .merge(path)
                .call(function (path) {
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
            })
                .attr('fill', function (d, i) { return drawSettings.color(drawSettings.labelAccessor(d.data, i)); });
            if (options.events) {
                path.call(this.attachListenters, this.events, options.events.bind);
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
    angular.module('cedrus.ui.components.cdChart')
        .factory('pieChartService', function () { return new CdPieChartService(); });
})(CdCharts || (CdCharts = {}));

var cedrus;
(function (cedrus) {
    var ui;
    (function (ui) {
        var components;
        (function (components) {
            var constant;
            (function (constant) {
                'use strict';
                var ConstantDirective = (function () {
                    function ConstantDirective($injector) {
                        var _this = this;
                        this.$injector = $injector;
                        this.restrict = 'EA';
                        this.scope = {
                            name: '@?',
                            key: '@?',
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
                                value = _this.$injector.get(name);
                                if (key != null && key !== '') {
                                    value = value[key];
                                }
                                else if (attrs['key']) {
                                    console.warn('constant key is defined without a value');
                                }
                                if (isReplace === true) {
                                    element.replaceWith(value);
                                }
                                else {
                                    element.text(value);
                                }
                            }
                        };
                    }
                    ConstantDirective.$inject = ['$injector'];
                    ConstantDirective.factory = function () {
                        function instance($injector) {
                            return new ConstantDirective($injector);
                        }
                        instance.$inject = ['$injector'];
                        return instance;
                    };
                    return ConstantDirective;
                }());
                angular.module('cedrus.ui.components.constant', [])
                    .directive('cdConstant', ConstantDirective.factory());
            })(constant = components.constant || (components.constant = {}));
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
                        this.setDefaults = function () {
                            _this.filters = angular.copy(_this.options.defaultFilterOptions);
                            _this.filterGroups = angular.copy(_this.options.defaultFilterGroups);
                            _this.options.currentFilters = {};
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
                        };
                        this.changeFilter = function (filter, optionName, index) {
                            var filterName = filter.name;
                            var group = filter.group;
                            var filterOptions = filter.options;
                            var updatedOption = filter.options[optionName];
                            var currentFilterOption = _this.options.currentFilters[group][filterName];
                            var changedFilter = {
                                group: group,
                                filterName: filterName,
                                updatedOption: updatedOption.value,
                                isSelected: updatedOption.isSelected
                            };
                            if (filter.type === 'checkbox') {
                                _this.options.currentFilters[group][filterName] = checkboxHandler(currentFilterOption, updatedOption);
                            }
                            else {
                                _this.options.currentFilters[group][filterName] = _this.customFields[filter.type].handler(currentFilterOption, updatedOption, filter);
                            }
                            _this.options.filterChanged(_this.options.currentFilters, changedFilter);
                        };
                        this.setDefaults();
                    }
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
                    SidebarFilterController.$inject = [];
                    return SidebarFilterController;
                }());
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

angular.module('cedrus.ui').run(['$templateCache', function($templateCache) {$templateCache.put('components/calendar/calendar.tpl.html','<div class="container"><div class="hider" ng-click="vm.displayCal()" ng-show="vm.showCal"></div><div class="input-blocker" ng-click="vm.displayCal()" readonly="true"></div><input type="text" class="md-select" ng-model="vm.selection"><div ng-show="vm.showCal" class="panel"><div class="md-whiteframe-2dp"><div class="yearrow" layout="row" layout-align="space-between end"><md-button class="calbtn" ng-click="vm.setYear(-1)" ng-hide="vm.yearSel" aria-label="previous year"><i class="fa fa-chevron-left"></i></md-button><md-button class="calbtn" ng-click="vm.setYear(-12)" ng-show="vm.yearSel" aria-label="go back one page"><i class="fa fa-chevron-left"></i></md-button><md-button class="calbtn yearbtn" ng-click="vm.flipCal()" aria-label="swap between month and year select">{{vm.date.selYear || vm.initYear}}</md-button><md-button class="calbtn" ng-click="vm.setYear(1)" ng-hide="vm.yearSel" aria-label="next year"><i class="fa fa-chevron-right"></i></md-button><md-button class="calbtn" ng-click="vm.setYear(12)" ng-show="vm.yearSel" aria-label="go forward by one page"><i class="fa fa-chevron-right"></i></md-button></div><div layout="row" ng-repeat="monthRow in vm.monthMap" ng-hide="vm.yearSel"><md-button class="calbtn monthSelect" ng-repeat="month in monthRow" ng-click="vm.setMonth(month.value)" aria-label="choose {{month.value}}">{{month.display}}</md-button></div><div layout="row" ng-repeat="yearRow in vm.yearMap" ng-show="vm.yearSel"><md-button class="calbtn yearSelect" ng-repeat="year in yearRow" ng-click="vm.flipCal(); vm.setYear(year)" aria-label="choose {{year}}">{{(vm.date.selYear||vm.initYear)+year}}</md-button></div></div></div></div>');
$templateCache.put('components/grouped-bar-chart/grouped-bar-chart.tpl.html','<div class="cd-grouped-bar-chart"><div ng-hide="vm.showData()"><div layout="row" layout-fill layout-align="center center" class="no-data"><span>There are no active tasks.</span></div></div><div ng-show="vm.showData()"><div ng-repeat="group in vm.groupDataKeys"><div layout="row" class="group-item"><div layout="column"><md-icon ng-hide="vm.expandField(group)" md-font-icon="fa fa-caret-right" ng-click="vm.setExpandedField(group)" ng-if="vm.options.subFields"></md-icon><md-icon ng-show="vm.expandField(group)" md-font-icon="fa fa-caret-down" ng-click="vm.setExpandedField(group, true)" ng-if="vm.options.subFields"></md-icon></div><div layout="column" flex><div layout="row" layout-align="space-around none"><div flex="60" layout-align="start center">{{group}}</div><div flex="20">Count: {{vm.groupData[group].length}}</div><div flex="20">{{vm.groupData[group].length*100/vm.totalKeys | number:0}}%</div></div></div></div><div layout="row" flex class="line-color"><div ng-style="{width:vm.groupData[group].length*100/vm.totalKeys + \'%\', \'background\': vm.getColor($index, group)}" class="red-line"></div></div><div class="data-container" ng-show="vm.expandField(group)"><div layout="column" ng-show="vm.expandField(group)" ng-if="vm.options.subFields"><div ng-repeat="el in vm.groupData[group]"><div ng-include="vm.options.extendedTemplate || \'lineChartSingleItemExpanded\'"></div></div></div></div></div><div layout="row" layout-align="end none" class="total">Total Count:{{vm.totalKeys}}</div></div></div><script type="text/ng-template" id="lineChartSingleItemExpanded"><div class="panel" layout="column" layout-align="center none">\n        <div layout="row" layout-align="space-between none" class="data-row">\n            <div ng-repeat="(field, displayText ) in vm.options.subFields">\n                <span class="bold-text">{{displayText}}</span>\n                <span>{{el[field]}}</span>\n            </div>\n        </div>\n    </div></script>');
$templateCache.put('components/sidebar-filter/sidebar-filter.tpl.html','<!--implemenation for user provided custom type/templates--><!--change naming to filter-tree, side-filter towards end--><div class="cd-sidebar-filter"><div ng-repeat="group in vm.filterGroups track by $index" class="cdFilterGroupLevel"><div ng-if="!vm.options.isFlat"><md-button ng-click="vm.toggleExpand(group)" class="md-icon-button" aria-label="expand"><md-icon md-font-set="fa" md-font-icon="fa-chevron-right" ng-class="(group.isExpanded  !== false )? \'fa-chevron-down\': \'fa-chevron-right\'"></md-icon></md-button><span>{{ ::vm.processTitle(group, 0) }}</span></div><ul ng-show="group.isExpanded !== false" layout="column" ng-repeat="(filterName, filter) in vm.filters[group.key] track by filterName" class="cdFilterFilterLevel" ng-class="{ cdFilterFlat : vm.options.isFlat}"><li><div><md-button ng-click="vm.toggleExpand(filter)" class="md-icon-button" aria-label="expand"><md-icon md-font-set="fa" md-font-icon="fa-chevron-right" ng-class="(filter.isExpanded  !== false )? \'fa-chevron-down\': \'fa-chevron-right\'"></md-icon></md-button><span>{{::vm.processTitle(filter, 1)}}</span><ul ng-show="filter.isExpanded !== false"><div ng-if="filter.type === \'checkbox\'" ng-include="\'cdCheckBoxFilter\'"></div><div ng-if="filter.type !== \'checkbox\'" ng-include="vm.customFields[filter.type].template"></div></ul></div></li></ul></div></div><script type="text/ng-template" id="cdCheckBoxFilter"><li ng-repeat="(optionName, option) in filter.options track by optionName" class="cdFilterOptionLevel">\n        <md-checkbox ng-model="option.isSelected" ng-change="vm.changeFilter(filter, optionName, $index)" class="md-primary" ng-model-options="{debounce: 250}"\n            aria-label="{{::vm.processTitle(option, 2)}}">\n            <span>{{::vm.processTitle(option, 2)}}</span>\n        </md-checkbox>\n    </li></script>');}]);
})(window, window.angular);;window.cedrusUI={version:{full: "0.2.14"}};