/**
 * @author <a href="i@qiancheng.me">千橙</a>
 */
'use strict';

angular.module('test-http-case', ['ngRoute', 'ui.bootstrap'])
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
	.factory('testHttpCaseService', ['$q', '$http', function ($q, $http) {
		return ({
			getHttpRequestList: function (pageIndex, pageSize, httpUrl, requestType) {
				var url = 'testHttpRequest/list?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
				if (httpUrl) {
					url = url + "&url=" + httpUrl;
				}
				if (requestType) {
					url = url + "&requestType=" + requestType;
				}
				var promise = $http.get(url).then(function (response) {
                    return response;
				}, function (response) {
                    return response;
                });
                return promise;
			},
			getList: function (pageIndex, pageSize, httpUrl, requestType) {
				var url = 'testHttpCase/httpCaseList?pageIndex=' + pageIndex + '&pageSize=' + pageSize;
				if (httpUrl) {
					url = url + "&url=" + httpUrl;
				}
				if (requestType) {
					url = url + "&requestType=" + requestType;
				}
				var promise = $http.get(url).then(function (response) {
                    return response;
				}, function (response) {
                    return response;
                });
                return promise;
			},
			add: function (testHttpCase) {
				var url = 'testHttpCase/add';
				var promise = $http.post(url, testHttpCase).then(function (response) {
                    return response;
				}, function (response) {
                    return response;
                });
                return promise;
            },
			modify: function (testHttpCase) {
				var url = 'testHttpCase/update';
				var promise = $http.post(url, testHttpCase).then(function (response) {
                    return response;
				}, function (response) {
                    return response;
                });
                return promise;
            },
			getView: function (id) {
				var url = 'testHttpCase/httpCaseView/' + id;
				var promise = $http.get(url).then(function (response) {
                    return response;
				}, function (response) {
                    return response;
                });
                return promise;
            },
			validate: function ($scope) {
				if (!$scope.testHttpCase) {
					$scope.alert('提示：', '请先填写各项信息');
                    return false;
				}
				if (!$scope.testHttpCase.url) {
					$scope.alert('提示：', '请先选择测试Http接口');
                    return false;
				}
				if (!$scope.testHttpCase.requestType) {
					$scope.alert('提示：', '请先选择测试Http接口');
                    return false;
				}
				if (!$scope.testHttpCase.jmxPort) {
					$scope.alert('提示：', '请先选择测试Http接口');
                    return false;
				}
				if (!$scope.testHttpCase.clientCount) {
					$scope.alert('提示：', '客户端数量不能为空');
                    return false;
				}
				if (!/^\+?[1-9][0-9]*$/.test($scope.testHttpCase.clientCount)) {
					$scope.alert('提示：', '客户端数量只能为正整数');
                    return false;
				}
				if (parseInt($scope.testHttpCase.clientCount) > 10000) {
					$scope.alert('提示：', '客户端数量不能超过10000');
                    return false;
				}
				if (!$scope.testHttpCase.messageCount) {
					$scope.alert('提示：', '发送消息数不能为空');
                    return false;
				}
				if (!/^\+?[1-9][0-9]*$/.test($scope.testHttpCase.messageCount)) {
					$scope.alert('提示：', '发送消息数只能为正整数');
                    return false;
				}
				if (!$scope.testHttpCase.connectionTimeout) {
					$scope.alert('提示：', '连接超时时间不能为空');
                    return false;
				}
				if (!/^\+?[1-9][0-9]*$/.test($scope.testHttpCase.connectionTimeout)) {
					$scope.alert('提示：', '连接超时时间只能为正整数');
                    return false;
				}
				if (!$scope.testHttpCase.requestTimeout) {
					$scope.alert('提示：', '请求超时时间不能为空');
                    return false;
				}
				if (!/^\+?[1-9][0-9]*$/.test($scope.testHttpCase.requestTimeout)) {
					$scope.alert('提示：', '请求超时时间只能为正整数');
                    return false;
				}
				return true;
            },
			del: function (id) {
				var url = 'testHttpCase/delete';
                var deferred = $q.defer();
				var promise = $http.post(url, {id: id}).then(function (response) {
                    return response;
				}, function (response) {
                    return response;
                });
                return promise;
            },
			addSubmit: function (id, testCase) {
				var url = 'testsubmit/add';
				var interfaceDetail = {
					id: testCase.id,
					clientCount: testCase.clientCount,
					messageCount: testCase.messageCount,
					connectionTimeout: testCase.connectionTimeout,
					requestTimeout: testCase.requestTimeout,
					componentType: testCase.interfaceName ? 1 : 2,
					url: testCase.url ? testCase.url : '',
					requestType: testCase.requestType ? testCase.requestType : '',
					host: testCase.host ? testCase.host : '',
					port: testCase.port ? testCase.port : null,
					jmxPort: testCase.jmxPort ? testCase.jmxPort : null,
					interfaceName: testCase.interfaceName ? testCase.interfaceName : '',
					method: testCase.methodName ? testCase.methodName : '',
					paramters: testCase.paramters ? testCase.paramters : '',
					group: testCase.groupName ? testCase.groupName : '',
					version: testCase.version ? testCase.version : ''
				};
				var promise = $http.post(url, {
					id: id,
					interfaceDetail: JSON.stringify(interfaceDetail)
				}).then(function (response) {
					return response;
				}, function (response) {
                    return response;
                });
                return promise;
            },
			run: function (id, submitId) {
				var url = 'testHttpCase/run';
				var promise = $http.post(url, {testSubmitid: submitId, testCaseId: id}).then(function (response) {
                    return response;
				}, function (response) {
                    return response;
                });
                return promise;
            }
        })
    }])
	.controller('TestHttpCaseController', ['$scope', '$http', 'testHttpCaseService', 'commonService', '$location', '$rootScope',
		function ($scope, $http, testHttpCaseService, commonService, $location, $rootScope) {
			$scope.currentPage = 1;
			$scope.pageSize = 10;
			$scope.url = '';
			$scope.requestType = '';
			$scope.typeList = ['GET', 'POST'];
			// load data
			var loadData = function () {
				testHttpCaseService.getList($scope.currentPage, $scope.pageSize, $scope.url, $scope.requestType).then(function (res) {
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
				$location.path('testHttpCase/add');
			};
			//update
			$scope.update = function (id) {
				$location.path('testHttpCase/modify/' + id);
			};
			//run
			$scope.run = function (id, interfaceDetail) {
				$scope.confirm('提示', '确定要运行吗', function () {
					testHttpCaseService.addSubmit(id, interfaceDetail).then(function (res) {
						if (res.data.code == 0) {
//    					$scope.alert('提示','删除成功');
							loadData();
							if (res.data.data) {
								testHttpCaseService.run(id, res.data.data).then(function (res1) {
									if (res1.data.code == 0) {
										$scope.alert('提示', '运行结束，可以查看运行结果');
										loadData();
									}
								}, function (rej1) {
								});
							}
						}
						else if (res.data.code == -1) {
							$scope.alert('提示', res.data.msg);
						}
					}, function (rej) {

					});
				});
			};
			//result
			$scope.result = function (testHttpCaseId, url, requestType, clientCount, messageCount) {

				$location.path('testHttpResult/' + testHttpCaseId + "/" + encodeURIComponent(url) + "/" + requestType + "/" + clientCount + "/" + messageCount);
			};
			$scope.del = function (id) {
				$scope.confirm('提示', '确定要删除吗', function () {
					testHttpCaseService.del(id).then(function (res) {
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
	.controller('TestHttpCaseAddController', ['$scope', '$http', 'testHttpCaseService', '$location', '$rootScope',
		function ($scope, $http, testHttpCaseService, $location, $rootScope) {
			$scope.typeList = ['GET', 'POST'];
			$rootScope.selectCase = undefined;

			$rootScope.$watch('selectCase', function (newValue, oldValue) {
				if (newValue) {
					var rootInfo = {
						interfaceId: newValue.interfaceSelectId,
						url: newValue.interfaceSelectUrl,
						parameters: newValue.interfaceSelectParameters,
						jmxPort: newValue.interfaceSelectJmxPort,
						host: newValue.interfaceSelectHost,
						requestType: newValue.interfaceSelectRequestType
					};
					if ($scope.testHttpCase) {
						$scope.testHttpCase = angular.extend($scope.testHttpCase, rootInfo);
					}
					else {
						$scope.testHttpCase = rootInfo;
					}
				}
			});

			//submit
			$scope.submit = function () {
				if (testHttpCaseService.validate($scope)) {
					$scope.testHttpCase.componentType = 1;
					testHttpCaseService.add($scope.testHttpCase).then(function (res) {
						if (res.data.code == 0) {
							$location.path('testHttpCase');
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
				$location.path('testHttpCase');
			};

			$scope.panelName = '新增Http接口测试用例';
			$scope.btnSure = '确定';
			$scope.btnCancel = '取消';
		}])
	.controller('TestHttpCaseModifyController', ['$scope', '$http', 'testHttpCaseService', '$location', '$rootScope', '$routeParams',
		function ($scope, $http, testHttpCaseService, $location, $rootScope, $routeParams) {
			$scope.typeList = ['GET', 'POST'];
			//获取view
			testHttpCaseService.getView($routeParams.id).then(function (res) {
				if (res.data.code == 0) {
					$scope.testHttpCase = res.data.data;
				}
				else if (res.data.code == -1) {
					$scope.alert('提示', res.data.msg);
					$location.path('testHttpCase');
				}
			}, function (rej) {

			});

			//submit
			$scope.submit = function () {
				if (testHttpCaseService.validate($scope)) {
					testHttpCaseService.modify($scope.testHttpCase).then(function (res) {
						if (res.data.code == 0) {
							$location.path('testHttpCase');
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
				$location.path('testHttpCase');
			};

			//init data
			$scope.panelName = '编辑Http接口测试用例';
			$scope.btnSure = '保存';
			$scope.btnCancel = '返回';

			$rootScope.selectCase = undefined;
		}])
	.controller('TestHttpCaseSelectInterfaceController', ['$scope', '$rootScope', '$uibModal', function ($scope, $rootScope, $uibModal) {
		$rootScope.gridWindow = {};
		//工程选择
		$scope.showInterfaceWindow = function () {
			openGridInterfaceWindow('请选择Http接口');
		};

		//打开窗口
		var openGridInterfaceWindow = function (title) {
			var gridWindowScope = $rootScope.$new();
			gridWindowScope.title = title;

			//创建modal实例
			$rootScope.gridWindow.modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/templates/test-http-case/select_interface.html',
				controller: 'GridWindowHttpRequestSelectController',
				windowClass: 'stress-dialog',
				scope: gridWindowScope
			});

		}
    }])
	.controller('GridWindowHttpRequestSelectController', ['$scope', '$rootScope', '$http', 'testHttpCaseService', 'commonService', function ($scope, $rootScope, $http, testHttpCaseService, commonService) {

		$scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.url = '';
        $scope.requestType = '';
		$scope.typeList = ['GET', 'POST'];
		$scope.search = function () {
			$scope.currentPage = 1;
			loadData();
		};

		//加载数据
		var loadData = function () {
			testHttpCaseService.getHttpRequestList($scope.currentPage, $scope.pageSize, $scope.url, $scope.requestType).then(
				function (res) {
					$scope.list = res.data.data.list;
					$scope.totalItems = res.data.data.total;

				}, function (rej) {
					// error handler
				}
			);
		};

		//监听页数发生变更则reload数据
		$scope.$watch('currentPage', function (newValue, oldValue) {
			loadData();
		});


		//modal选择按钮
		$scope.select = function (record) {
			$rootScope.selectCase = {
				interfaceSelectId: record.id,
				interfaceSelectUrl: record.url,
				interfaceSelectParameters: record.parameters,
				interfaceSelectRequestType: record.requestType,
				interfaceSelectHost: record.host,
				interfaceSelectJmxPort: record.jmxPort
			};
			//发生回调
			$rootScope.gridWindow.modalInstance.close();
		};

		//modal取消按钮
		$scope.cancel = function () {
			$rootScope.gridWindow.modalInstance.close();
		};

	}]);