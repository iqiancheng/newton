/**
 * Created by Carino on 2016/4/13.
 */
'use strict';

angular.module('test-interface', ['ngRoute', 'ui.bootstrap'])
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
    .factory('testInterfaceService',['$q','$http',function($q, $http){
        return({        	
        	getList : function(pageIndex, pageSize, host, interfaceName, method, port, jmxPort) {
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
        		if (port) {
        			url = url + "&port=" + port;
        		}
        		if (jmxPort) {
        			url = url + "&jmxPort=" + jmxPort;
        		}
                var deferred = $q.defer();
                var promise =  $http.get(url).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
        	},
            add : function(testInterface) {
            	var url = 'testInterface/add';
                var deferred = $q.defer();
                var promise =  $http.post(url, testInterface).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
            },
            modify : function(testInterface) {
            	var url = 'testInterface/update';
                var deferred = $q.defer();
                var promise =  $http.post(url, testInterface).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
            },
            getView : function(id) {
            	var url = 'testInterface/view/'+id;
                var deferred = $q.defer();
                var promise =  $http.get(url).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
            },
            del : function(id) {
	        	var url = 'testInterface/delete';
	            var deferred = $q.defer();
	            var promise =  $http.post(url, {id : id}).then(function(response) {
	                return response;
	            },function(response){
	                return response;
	            });
	            return promise;
	        },
            validate : function($scope) {
            	if (!$scope.testInterface) {
            		$scope.alert('提示：', '请先填写各项信息');
                    return false;
            	}
            	if (!$scope.testInterface.host) {
            		$scope.alert('提示：', '主机IP不能为空');
                    return false;
            	}
				if (!$scope.testInterface.port) {
					$scope.alert('提示：', '服务端口不能为空');
                    return false;  		
            	}
				if (!/^\+?[1-9][0-9]*$/.test($scope.testInterface.port)) {
					$scope.alert('提示：', '服务端口只能为正整数');
                    return false;		
            	}
				if (parseInt($scope.testInterface.port) > 65535) {
					$scope.alert('提示：', '服务端口不能超过65535');
                    return false;
				}
				if (!$scope.testInterface.jmxPort) {
					$scope.alert('提示：', 'JMX端口不能为空');
                    return false;
				}
				if (!/^\+?[1-9][0-9]*$/.test($scope.testInterface.jmxPort)) {
					$scope.alert('提示：', 'JMX端口只能为正整数');
                    return false;		
            	}
				if (parseInt($scope.testInterface.jmxPort) > 65535) {
					$scope.alert('提示：', 'JMX端口不能超过65535');
                    return false;
				}
				if (!$scope.testInterface.interfaceName) {
					$scope.alert('提示：', '服务名称不能为空');
                    return false;
            	}
				if (!$scope.testInterface.methodName) {
					$scope.alert('提示：', '方法名称不能为空');
                    return false;	
            	}
				if (!$scope.testInterface.groupName) {
					$scope.alert('提示：', '分组不能为空');
                    return false;
				}
				if (!$scope.testInterface.version) {
					$scope.alert('提示：', '版本不能为空');
                    return false;
            	}
				if (!$scope.testInterface.parameters) {
					$scope.alert('提示：', '参数不能为空');
                    return false;		
            	}
				if (!$scope.testInterface.description) {
					$scope.alert('提示：', '描述不能为空');
                    return false;
				}
				return true;
            }
        })
    }])
    .controller('TestInterfaceController', ['$scope', '$http','testInterfaceService', 'commonService', '$location','$rootScope',
        function($scope, $http, testInterfaceService, commonService, $location, $rootScope) {
    	$scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.host = '';
        $scope.interfaceName = '';
        $scope.method = '';
        $scope.port = '';
			$scope.jmxPort = '';
        
        // load data
        var loadData = function() {
        	testInterfaceService.getList($scope.currentPage, $scope.pageSize, $scope.host, $scope.interfaceName, $scope.method, $scope.port, $scope.jmxPort).then(function (res) {
                $scope.interfaceList = res.data.data.list;
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
            $location.path('testInterface/add');
        };
        //update
        $scope.update = function(id) {
            $location.path('testInterface/modify/'+id);
        };
        $scope.del = function (id) {
    		$scope.confirm('提示', '确定要删除吗', function(){
    			testInterfaceService.del(id).then(function (res) {
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
    .controller('TestInterfaceAddController', ['$scope', '$http','testInterfaceService', '$location','$rootScope',
        function($scope, $http, testInterfaceService, $location, $rootScope) {
    	
    	//submit
        $scope.submit = function () {
        	if (testInterfaceService.validate($scope)) {
				testInterfaceService.add($scope.testInterface).then(function (res) {
					if (res.data.code == 0) {
						$location.path('testInterface');
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
            $location.path('testInterface');
        };
        
        $scope.panelName = '新增测试接口';
        $scope.btnSure = '确定';
        $scope.btnCancel = '取消';
    }])
    .controller('TestInterfaceModifyController', ['$scope', '$http','testInterfaceService', '$location','$rootScope','$routeParams',
        function($scope, $http, testInterfaceService, $location, $rootScope,$routeParams) {
    	//获取view
    	testInterfaceService.getView($routeParams.id).then(function (res) {
        	if(res.data.code == 0) {
                $scope.testInterface = res.data.data;
            }
            else if (res.data.code == -1) {
            	$scope.alert('提示',res.data.msg);
            	$location.path('testInterface');
            }
        }, function (rej) {
        	
        });
    	
    	//submit
        $scope.submit = function () {
        	if (testInterfaceService.validate($scope)) {
				delete $scope.testInterface.createTime;
				delete $scope.testInterface.modifyTime;
				delete $scope.testInterface.status;
				delete $scope.testInterface.creator;
				delete $scope.testInterface.lastUpdater;
				testInterfaceService.modify($scope.testInterface).then(function (res) {
					if (res.data.code == 0) {
						$location.path('testInterface');
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
            $location.path('testInterface');
        };

        //init data
        $scope.panelName = '编辑测试接口';
        $scope.btnSure = '保存';
        $scope.btnCancel = '返回';
   	}]);