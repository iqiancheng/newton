/**
 * @author <a href="i@qiancheng.me">千橙</a>
 */
'use strict';

angular.module('test-http-report', ['ngRoute', 'ui.bootstrap'])
    .directive('diHref', ['$location', '$route',
        function ($location, $route) {
            return function (scope, element, attrs) {
                scope.$watch('diHref', function () {
                    if (attrs.diHref) {
                        element.attr('href', attrs.diHref);
                        element.bind('click', function (event) {
                            scope.$apply(function () {
                                $route.reload();
                            });
                        });
                    }
                });
            }
        }])
    .factory('testHttpReportService', ['$q', '$http', function ($q, $http) {
        return ({
            getReport: function (resultId) {
                var url = 'testReport/report?resultId=' + resultId;
                var promise = $http.get(url).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                });
                return promise;
            }
        })
    }])
    .controller('TestHttpReportController', ['$scope', '$http', 'testHttpReportService', 'commonService', '$location', '$rootScope', '$routeParams', '$timeout', '$filter',
        function ($scope, $http, testHttpReportService, commonService, $location, $rootScope, $routeParams, $timeout, $filter) {
            $scope.currentPage = 1;
            $scope.pageSize = 10;

            $scope.testCaseId = $routeParams.testCaseId;
            $scope.url = decodeURIComponent($routeParams.url);
            $scope.requestType = $routeParams.requestType;
            $scope.parameters = $routeParams.parameters;
            $scope.clientCount = $routeParams.clientCount;
            $scope.messageCount = $routeParams.messageCount;
            $scope.sumTime = $routeParams.sumTime + ' ms';
            $scope.maxRequestTime = $routeParams.maxRequestTime + ' ms';
            $scope.minRequestTime = $routeParams.minRequestTime + ' ms';
            $scope.avgRequestTime = $routeParams.avgRequestTime + ' ms';
            $scope.successCount = $routeParams.successCount;
            $scope.failCount = $routeParams.failCount;
            $scope.qps = $routeParams.qps;

            $scope.cpuTrend = undefined;
            $scope.memTrend = undefined;
            $scope.threadTrend = undefined;

            $scope.chartList = [0, 1, 2];

            $scope.getOption = function (data) {
                return {
                    title: {
                        text: data.title,
                        x: 'center'
                    },
                    borderWidth: 10,
                    backgroundColor: '#fff',
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [],
                        y: 30
                    },
                    toolbox: {
                        show: false,
                        feature: {}
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        name: data.yAxisName
                    },
                    grid: {
                        top: 100
                    },
                    series: []
                };
            };

            $scope.getDataOption = function (data) {
                var series = [];

                for (var i = 0; i < data.legends.length; i++) {

                    series.push({
                        name: data.legends[i] ? data.legends[i] : '',
                        type: data.chartType,
                        data: data.data ? data.data[i] : []
                    });
                }
                return {
                    legend: {
                        data: data.legends,
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: data.timeData ? data.timeData : []
                    },
                    series: series
                };
            };

            // load data
            $scope.loadData = function () {
                testHttpReportService.getReport($routeParams.resultId).then(function (res) {
                    if (res.data.code == 0) {
                        var data = res.data.data;
                        if (data) {
                            $scope.startTime = $filter('date')(data.startTime, 'yyyy-MM-dd HH:mm:ss');
                            $scope.endTime = $filter('date')(data.endTime, 'yyyy-MM-dd HH:mm:ss');
                            $scope.chartInfo = data.chartInfo;

                            if ($scope.chartInfo && $scope.chartInfo.length > 0) {
                                angular.forEach($scope.chartInfo, function (record, index, array) {
                                    var showFlag = false;
                                    var chartNotExist = document.getElementById('chartNotExist' + index);
                                    var notExistStr = "[";
                                    for (var i = 0; i < record.legends.length; i++) {
                                        if (record.data && record.data[i] && record.data[i].length) {
                                            showFlag = true;
                                            break;
                                        }
                                        notExistStr += record.legends[i] + ",";
                                    }
                                    notExistStr = notExistStr.substr(0, notExistStr.length - 1) + "]无数据";
                                    var chartInstance = echarts.init(document.getElementById('chart' + index));
                                    chartInstance.setOption($scope.getOption(record));
                                    chartInstance.setOption($scope.getDataOption(record));
                                    if (showFlag) {
                                        chartNotExist.innerHTML = "";
                                    } else {
                                        chartNotExist.innerHTML = notExistStr;
                                    }
                                });
                            }
                        }
                    }
                }, function (rej) {

                });
            };

            $scope.showChart = function () {
                $timeout(function () {
                    $scope.loadData();
                }, 1000);
            };

            $scope.cancel = function () {
                $location.path('testHttpResult/' + $scope.testCaseId + "/" + encodeURIComponent($scope.url) + "/" + $scope.requestType + "/" + $scope.clientCount + "/" + $scope.messageCount);
            };

            $scope.showChart();
        }]);