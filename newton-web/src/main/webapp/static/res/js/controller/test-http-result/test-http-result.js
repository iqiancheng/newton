/**
 * @author <a href="i@qiancheng.me">千橙</a>
 */
'use strict';

angular.module('test-http-result', ['ngRoute', 'ui.bootstrap'])
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
    .factory('testHttpResultService', ['$q', '$http', function ($q, $http) {
        return ({
            getList: function (pageIndex, pageSize, testCaseId) {

                var url = 'testResult/list?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&testCaseId=' + testCaseId;
                var promise = $http.get(url).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                });
                return promise;
            }
        })
    }])
    .controller('TestHttpResultController', ['$scope', '$http', 'testHttpResultService', 'commonService', '$location', '$rootScope', '$routeParams',
        function ($scope, $http, testResultService, commonService, $location, $rootScope, $routeParams) {
            $scope.currentPage = 1;
            $scope.pageSize = 10;
            $scope.url = decodeURIComponent($routeParams.url);
            $scope.requestType = $routeParams.requestType;
            $scope.parameters = $routeParams.parameters;
            $scope.clientCount = $routeParams.clientCount;
            $scope.messageCount = $routeParams.messageCount;
            $scope.testCaseId = $routeParams.testHttpCaseId;

            // load data
            var loadData = function () {
                testResultService.getList($scope.currentPage, $scope.pageSize, $scope.testCaseId).then(function (res) {
                    $scope.list = res.data.data.list;
                    $scope.totalItems = res.data.data.total;
                }, function (rej) {

                });
            };

            //cancel
            $scope.cancel = function () {
                $location.path('testHttpCase');
            };

            //report
            $scope.report = function (resultId, sumTime, maxRequestTime, minRequestTime,
                                      avgRequestTime, successCount, failCount, qps) {
                $location.path('testHttpReport/' + $scope.testCaseId + '/' + encodeURIComponent($scope.url) + '/' + $scope.requestType
                    + '/' + $scope.parameters + '/' + $scope.clientCount + '/' + $scope.messageCount
                    + '/' + resultId + '/' + sumTime + '/' + maxRequestTime
                    + '/' + minRequestTime + '/' + avgRequestTime + '/' + successCount + '/' + failCount + '/' + qps);
            };

            $scope.$watch('currentPage', function (newValue, oldValue) {
                loadData();
            });
        }]);