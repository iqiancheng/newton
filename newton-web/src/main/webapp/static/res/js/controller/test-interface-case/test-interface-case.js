/**
 * Created by Carino on 2016/4/13.
 */
'use strict';

angular.module('test-interface-case', ['ngRoute', 'ui.bootstrap'])
	.directive('diHref', ['$location', '$route',
	    function($location, $route) {
	        return function(scope, element, attrs) {
	            scope.$watch('diHref', function() {
	                if(attrs.diHref) {
	                    element.attr('href', attrs.diHref);
	                    element.bind('click', function(event) {
	                        scope.$apply(function(){
	                            $route.reload();
	                        });
	                    });
	                }
	            });
	        }
	    }])
    .factory('testCaseService',['$q','$http',function($q, $http){
        return({  
        	getInterfaceList : function(pageIndex, pageSize, host, interfaceName, method) {
        		var url = 'testInterface/list?pageIndex='+pageIndex+'&pageSize='+pageSize;
        		if (host) {
        			url = url + "&host=" + host;
        		}
        		if (interfaceName) {
        			url = url + "&interfaceName=" + interfaceName;
        		}
        		if (method) {
        			url = url + "&method=" + method;
        		}
                var deferred = $q.defer();
                var promise =  $http.get(url).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
        	},
        	getList : function(pageIndex, pageSize, host, interfaceName, method) {
        		var url = 'testCase/interfaceCaseList?pageIndex='+pageIndex+'&pageSize='+pageSize;
        		if (host) {
        			url = url + "&host=" + host;
        		}
        		if (interfaceName) {
        			url = url + "&interfaceName=" + interfaceName;
        		}
        		if (method) {
        			url = url + "&method=" + method;
        		}
                var deferred = $q.defer();
                var promise =  $http.get(url).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
        	},
            add : function(testCase) {
            	var url = 'testCase/add';
                var deferred = $q.defer();
                var promise =  $http.post(url, testCase).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
            },
            modify : function(testCase) {
            	var url = 'testCase/update';
                var deferred = $q.defer();
                var promise =  $http.post(url, testCase).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
            },
            getView : function(id) {
            	var url = 'testCase/interfaceCaseView/'+id;
                var deferred = $q.defer();
                var promise =  $http.get(url).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
            },
            validate : function($scope) {
            	if (!$scope.testCase) {
            		$scope.alert('提示：', '请先填写各项信息');
                    return false;
            	}
            	if (!$scope.testCase.host) {
            		$scope.alert('提示：', '请先选择测试接口');
                    return false;
            	}
				if (!$scope.testCase.port) {
					$scope.alert('提示：', '请先选择测试接口');
                    return false;  		
            	}
				if (!$scope.testCase.jmxPort) {
					$scope.alert('提示：', '请先选择测试接口');
                    return false;
				}
				if (!$scope.testCase.interfaceName) {
					$scope.alert('提示：', '请先选择测试接口');
                    return false;
            	}
				if (!$scope.testCase.methodName) {
					$scope.alert('提示：', '请先选择测试接口');
                    return false;	
            	}
				if (!$scope.testCase.groupName) {
					$scope.alert('提示：', '请先选择测试接口');
                    return false;
				}
				if (!$scope.testCase.version) {
					$scope.alert('提示：', '请先选择测试接口');
                    return false;
            	}
				if (!$scope.testCase.clientCount) {
					$scope.alert('提示：', '客户端数量不能为空');
                    return false;		
            	}
				if (!/^\+?[1-9][0-9]*$/.test($scope.testCase.clientCount)) {
					$scope.alert('提示：', '客户端数量只能为正整数');
                    return false;		
            	}
				if (parseInt($scope.testCase.clientCount) > 10000) {
					$scope.alert('提示：', '客户端数量不能超过10000');
                    return false;		
            	}
				if (!$scope.testCase.messageCount) {
					$scope.alert('提示：', '发送消息数不能为空');
                    return false;
				}
				if (!/^\+?[1-9][0-9]*$/.test($scope.testCase.messageCount)) {
					$scope.alert('提示：', '发送消息数只能为正整数');
                    return false;		
            	}
				if (!$scope.testCase.connectionTimeout) {
					$scope.alert('提示：', '连接超时时间不能为空');
                    return false;
				}
				if (!/^\+?[1-9][0-9]*$/.test($scope.testCase.connectionTimeout)) {
					$scope.alert('提示：', '连接超时时间只能为正整数');
                    return false;		
            	}
				if (!$scope.testCase.requestTimeout) {
					$scope.alert('提示：', '请求超时时间不能为空');
                    return false;
				}
				if (!/^\+?[1-9][0-9]*$/.test($scope.testCase.requestTimeout)) {
					$scope.alert('提示：', '请求超时时间只能为正整数');
                    return false;		
            	}
				return true;
            },
            del : function(id) {
            	var url = 'testCase/delete';
                var deferred = $q.defer();
                var promise =  $http.post(url, {id : id}).then(function(response) {
                    return response;
                },function(response){
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
                },function(response){
                    return response;
                });
                return promise;
            },
            run : function(id, submitId) {
            	var url = 'testCase/run';
                var deferred = $q.defer();
                var promise =  $http.post(url, {testSubmitid : submitId, testCaseId : id}).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
            }
        })
    }])
    .controller('TestCaseController', ['$scope', '$http','testCaseService', 'commonService', '$location','$rootScope',
        function($scope, $http, testCaseService, commonService, $location, $rootScope) {
    	$scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.host = '';
        $scope.interfaceName = '';
        $scope.method = '';
        
        // load data
        var loadData = function() {
        	testCaseService.getList($scope.currentPage, $scope.pageSize, $scope.host, $scope.interfaceName, $scope.method).then(function (res) {
                $scope.testCaseList = res.data.data.list;
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
        $scope.gotoAdd = function() {
            $location.path('testCase/add');
        };
        //update
        $scope.update = function(id) {
            $location.path('testCase/modify/'+id);
        };
        //run
			$scope.run = function (id, interfaceDetail) {
        	$scope.confirm('提示', '确定要运行吗', function(){
				testCaseService.addSubmit(id, interfaceDetail).then(function (res) {
					if (res.data && res.data.code == 0) {
    					loadData();
    					if (res.data.data) {
    						testCaseService.run(id, res.data.data).then(function (res1) {
    							if (res1.data.code == 0) {
    								$scope.alert('提示','运行结束，可以查看运行结果');
    								loadData();
    							}
    						}, function (rej1) {
    		    			});
    					}
    				}
    				else if (res.data.code == -1) {
    					$scope.alert('提示',res.data.msg);
    				}
    			}, function (rej) {
    				
    			});
    		});
        };
        //result
        $scope.result = function(testCaseId, host, interfaceName, methodName, clientCount, messageCount) {
            $location.path('testResult/'+testCaseId+"/"+host+"/"+interfaceName+"/"+methodName+"/"+clientCount+"/"+messageCount);
        };
        $scope.del = function (id) {
    		$scope.confirm('提示', '确定要删除吗', function(){
    			testCaseService.del(id).then(function (res) {
    				if(res.data.code == 0) {
    					$scope.alert('提示','删除成功');
    					loadData();
    				}
    				else if (res.data.code == -1) {
    					$scope.alert('提示',res.data.msg);
    				}
    			}, function (rej) {
    				
    			});
    		});
        };

        $scope.$watch('currentPage', function(newValue, oldValue) {
            loadData();
        });
    }])
    .controller('TestCaseAddController', ['$scope', '$http','testCaseService', '$location','$rootScope',
        function($scope, $http, testCaseService, $location, $rootScope) {
    	
    	$rootScope.selectCase = undefined;
    	
    	$rootScope.$watch('selectCase', function(newValue, oldValue) {
    		if (newValue) {
    			var rootInfo = {
    					interfaceId : newValue.interfaceSelectId,
    					host : newValue.interfaceSelectHost,
    					port : newValue.interfaceSelectPort,
    					jmxPort : newValue.interfaceSelectJmxPort,
    					interfaceName : newValue.interfaceSelectInterfaceName,
    					methodName : newValue.interfaceSelectMethodName,
    					groupName : newValue.interfaceSelectGroupName,
    					version : newValue.interfaceSelectVersion	
    			};
    			if ($scope.testCase) {
    				$scope.testCase = angular.extend($scope.testCase, rootInfo);
    			}
    			else {
    				$scope.testCase = rootInfo;
    			}
    		}
    	});
    	
    	//submit
        $scope.submit = function () {
        	if (testCaseService.validate($scope)) {
				$scope.testCase.componentType = 1;
				testCaseService.add($scope.testCase).then(function (res) {
					if (res.data.code == 0) {
						$location.path('testCase');
					}
					else if (res.data.code == -1) {
						$scope.alert('提示', res.data.msg);
					}
				}, function (rej) {

				});
        	}
        };

        //cancel
        $scope.cancel = function() {
            $location.path('testCase');
        };
        
        $scope.panelName = '新增服务接口测试用例';
        $scope.btnSure = '确定';
        $scope.btnCancel = '取消';
    }])
    .controller('TestCaseModifyController', ['$scope', '$http','testCaseService', '$location','$rootScope','$routeParams',
        function($scope, $http, testCaseService, $location, $rootScope,$routeParams) {
    	
    	//获取view
    	testCaseService.getView($routeParams.id).then(function (res) {
        	if(res.data.code == 0) {
                $scope.testCase = res.data.data;
            }
            else if (res.data.code == -1) {
            	$scope.alert('提示',res.data.msg);
            	$location.path('testCase');
            }
        }, function (rej) {
        	
        });
    	
    	//submit
        $scope.submit = function () {
        	if (testCaseService.validate($scope)) {
				testCaseService.modify($scope.testCase).then(function (res) {
					if (res.data.code == 0) {
						$location.path('testCase');
					}
					else if (res.data.code == -1) {
						$scope.alert('提示', res.data.msg);
					}
				}, function (rej) {

				});
        	}
		};

        //cancel
        $scope.cancel = function() {
        	$location.path('testCase');
        };

        //init data
        $scope.panelName = '编辑服务接口测试用例';
        $scope.btnSure = '保存';
        $scope.btnCancel = '返回';
        
        $rootScope.selectCase = undefined;
   	}])
   	.controller('TestCaseSelectInterfaceController', ['$scope', '$rootScope','$uibModal', function($scope, $rootScope, $uibModal) {
    	$rootScope.gridWindow = {};
    	//工程选择
    	
    	$scope.showInterfaceWindow = function() {   		    		
    		openGridInterfaceWindow('请选择服务接口');
    	};
    	
    	//打开窗口
    	var openGridInterfaceWindow = function(title) {
    		var gridWindowScope = $rootScope.$new();
    		gridWindowScope.title = title;
    		
    		//创建modal实例
    		$rootScope.gridWindow.modalInstance = $uibModal.open({
    			animation : true,
    			templateUrl : 'views/templates/test-interface-case/select_interface.html',
    			controller : 'GridWindowInterfaceSelectController',
    			windowClass: 'stress-dialog',
    			scope : gridWindowScope
    		});
    		
    	}
    }])
    .controller('GridWindowInterfaceSelectController', ['$scope', '$rootScope', '$http','testCaseService','commonService', function($scope, $rootScope, $http, testCaseService, commonService) {
    	
    	$scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.host = '';
        $scope.interfaceName = '';
        $scope.method = '';
        
    	$scope.search = function () {
    		$scope.currentPage = 1;
    		loadData();
		};
    	        
    	//加载app数据
    	var loadData = function() {
    		testCaseService.getInterfaceList($scope.currentPage, $scope.pageSize, $scope.host, $scope.interfaceName, $scope.method).then(
    			function(res) {
    				$scope.interfaceList = res.data.data.list;    					
    				$scope.totalItems = res.data.data.total;
    				
    			}, function(rej) {
    				// error handler
    			}
    		);
    	};
    	
    	//监听页数发生变更则reload数据
    	$scope.$watch('currentPage', function(newValue, oldValue) {
    		loadData();
    	});

    	
    	//modal选择按钮
		$scope.select = function (record) {
			$rootScope.selectCase = {
				interfaceSelectId : record.id,
				interfaceSelectHost : record.host,
				interfaceSelectPort : record.port,
				interfaceSelectJmxPort : record.jmxPort,
				interfaceSelectInterfaceName : record.interfaceName,
				interfaceSelectMethodName : record.methodName,
				interfaceSelectGroupName : record.groupName,
				interfaceSelectVersion : record.version
			};
			//发生回调
			$rootScope.gridWindow.modalInstance.close();
		};
	
		//modal取消按钮
		$scope.cancel = function () {
			$rootScope.gridWindow.modalInstance.close();
		};
		
	}]);