/**
 * @author <a href="i@qiancheng.me">千橙</a>
 */
'use strict';

angular.module('test-http', ['ngRoute', 'ui.bootstrap'])
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
    .factory('testHttpRequestService', ['$q', '$http', function ($q, $http) {
        return ({
            getList: function (pageIndex, pageSize, httpUrl, requestType, description) {
                var url = 'testHttpRequest/list?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
                if (httpUrl) {
                    url = url + "&url=" + httpUrl;
                }
                if (requestType) {
                    url = url + "&requestType=" + requestType;
                }
                if (description) {
                    url = url + "&description=" + description;
                }
                var promise = $http.get(url).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                });
                return promise;
            },
            add: function (testHttpRequest) {
                var url = 'testHttpRequest/add';
                var promise = $http.post(url, testHttpRequest).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                });
                return promise;
            },
            modify: function (testHttpRequest) {
                var url = 'testHttpRequest/update';
                var promise = $http.post(url, testHttpRequest).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                });
                return promise;
            },
            getView: function (id) {
                var url = 'testHttpRequest/view/' + id;
                var promise = $http.get(url).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                });
                return promise;
            },
            del: function (id) {
                var url = 'testHttpRequest/delete';
                var promise = $http.post(url, {id: id}).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                });
                return promise;
            },
            validate: function ($scope) {
                if (!$scope.testHttpRequest) {
                    $scope.alert('提示：', '请先填写各项信息');
                    return false;
                }
                if (!$scope.testHttpRequest.url) {
                    $scope.alert('提示：', '请求url不能为空');
                    return false;
                }
                if (!$scope.testHttpRequest.requestType) {
                    $scope.alert('提示：', '请求类型不能为空');
                    return false;
                }
                if ($scope.testHttpRequest.requestType != 'GET' && !$scope.testHttpRequest.parameters) {
                    $scope.alert('提示：', 'POST请求参数不建议为空');
                    return false;
                }
                return true;
            }
        })
    }])
    .controller('TestHttpRequestController', ['$scope', '$http', 'testHttpRequestService', 'commonService', '$location', '$rootScope',
        function ($scope, $http, testHttpRequestService, commonService, $location, $rootScope) {
            $scope.currentPage = 1;
            $scope.pageSize = 10;
            $scope.url = '';
            $scope.requestType = '';
            $scope.description = '';
            // $scope.domain = '';
            $scope.typeList = ['GET', 'POST'];

            // load data
            var loadData = function () {
                testHttpRequestService.getList($scope.currentPage, $scope.pageSize, $scope.url, $scope.requestType, $scope.description).then(function (res) {
                    $scope.list = res.data.data.list;
                    $scope.totalItems = res.data.data.total;
                }, function (rej) {

                });
            };

            //search
            $scope.search = function () {
                $scope.currentPage = 1;
                loadData();
            };

            //add
            $scope.gotoAdd = function () {
                $location.path('testHttpRequest/add');
            };
            //update
            $scope.update = function (id) {
                $location.path('testHttpRequest/modify/' + id);
            };
            $scope.del = function (id) {
                $scope.confirm('提示', '确定要删除吗', function () {
                    testHttpRequestService.del(id).then(function (res) {
                        if (res.data.code == 0) {
                            $scope.alert('提示', '删除成功');
                            loadData();
                        }
                        else if (res.data.code == -1) {
                            $scope.alert('提示', res.data.msg);
                        }
                    }, function (rej) {

                    });
                });
            };

            $scope.$watch('currentPage', function (newValue, oldValue) {
                loadData();
            });
        }])
    .controller('TestHttpRequestAddController', ['$scope', '$http', 'testHttpRequestService', '$location', '$rootScope',
        function ($scope, $http, testHttpRequestService, $location, $rootScope) {
            $scope.typeList = ['GET', 'POST'];
            $scope.testHttpRequest = {};
            $scope.testHttpRequest.requestType = 'GET';

            //submit
            $scope.submit = function () {
                if (testHttpRequestService.validate($scope)) {
                    testHttpRequestService.add($scope.testHttpRequest).then(function (res) {
                        if (res.data.code == 0) {
                            $location.path('testHttpRequest');
                        }
                        else if (res.data.code == -1) {
                            $scope.alert('提示', res.data.msg);
                        }
                    }, function (rej) {

                    });
                }
            };

            //cancel
            $scope.cancel = function () {
                $location.path('testHttpRequest');
            };

            $scope.panelName = '新增测试接口';
            $scope.btnSure = '确定';
            $scope.btnCancel = '取消';
        }])
    .controller('TestHttpRequestModifyController', ['$scope', '$http', 'testHttpRequestService', '$location', '$rootScope', '$routeParams',
        function ($scope, $http, testHttpRequestService, $location, $rootScope, $routeParams) {
            $scope.typeList = ['GET', 'POST'];

            //获取view
            testHttpRequestService.getView($routeParams.id).then(function (res) {
                if (res.data.code == 0) {
                    $scope.testHttpRequest = res.data.data;
                }
                else if (res.data.code == -1) {
                    $scope.alert('提示', res.data.msg);
                    $location.path('testHttpRequest');
                }
            }, function (rej) {

            });

            //submit
            $scope.submit = function () {
                if (testHttpRequestService.validate($scope)) {
                    delete $scope.testHttpRequest.createTime;
                    delete $scope.testHttpRequest.modifyTime;
                    delete $scope.testHttpRequest.status;
                    delete $scope.testHttpRequest.creator;
                    delete $scope.testHttpRequest.lastUpdater;
                    testHttpRequestService.modify($scope.testHttpRequest).then(function (res) {
                        if (res.data.code == 0) {
                            $location.path('testHttpRequest');
                        }
                        else if (res.data.code == -1) {
                            $scope.alert('提示', res.data.msg);
                        }
                    }, function (rej) {

                    });
                }
            };

            //cancel
            $scope.cancel = function () {
                $location.path('testHttpRequest');
            };

            //init data
            $scope.panelName = '编辑测试接口';
            $scope.btnSure = '保存';
            $scope.btnCancel = '返回';
        }]);