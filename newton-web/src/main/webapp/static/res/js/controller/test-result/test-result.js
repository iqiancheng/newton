/**
 * Created by Carino on 2016/4/13.
 */
'use strict';

angular.module('test-result', ['ngRoute', 'ui.bootstrap'])
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
    .factory('testResultService',['$q','$http',function($q, $http){
        return({        	
        	getList : function(pageIndex, pageSize, testCaseId) {
        		var url = 'testResult/list?pageIndex='+pageIndex+'&pageSize='+pageSize+'&testCaseId='+testCaseId;
                var deferred = $q.defer();
                var promise =  $http.get(url).then(function(response) {
                    return response;
                },function(response){
                    return response;
                });
                return promise;
        	}
        })
    }])
    .controller('TestResultController', ['$scope', '$http','testResultService', 'commonService', '$location','$rootScope', '$routeParams',
        function($scope, $http, testResultService, commonService, $location, $rootScope, $routeParams) {
    	$scope.currentPage = 1;
        $scope.pageSize = 10;
        
        $scope.host = $routeParams.host;
        $scope.interfaceName = $routeParams.interfaceName;
        $scope.methodName = $routeParams.methodName;
        $scope.clientCount = $routeParams.clientCount;
        $scope.messageCount = $routeParams.messageCount;
        $scope.testCaseId = $routeParams.testCaseId;
        
        // load data
        var loadData = function() {
        	testResultService.getList($scope.currentPage, $scope.pageSize, $scope.testCaseId).then(function (res) {
                $scope.resultList = res.data.data.list;
                $scope.totalItems = res.data.data.total;
            }, function (rej) {
            	
            });
        };
        
        //cancel
        $scope.cancel = function() {
            $location.path('testCase');
        };
        
        //report
        $scope.report = function(resultId, sumTime, maxRequestTime, minRequestTime, 
        		avgRequestTime, successCount, failCount, qps) {
            $location.path('testReport/'+$scope.testCaseId+'/'+$scope.host+'/'+$scope.interfaceName
            		+'/'+$scope.methodName+'/'+$scope.clientCount+'/'+$scope.messageCount
            		+'/'+resultId+'/'+sumTime+'/'+maxRequestTime
            		+'/'+minRequestTime+'/'+avgRequestTime+'/'+successCount+'/'+failCount+'/'+qps);
        };

        $scope.$watch('currentPage', function(newValue, oldValue) {
            loadData();
        });
    }]);