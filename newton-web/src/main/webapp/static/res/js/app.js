var app = angular.module('app', [
	'ngRoute',
	'ui.bootstrap',
    'toggle',
    'objectTable',
	'test-interface',
	'test-http',
	'test-interface-case',
	'test-http-case',
	'test-result',
	'test-http-result',
	'test-report',
	'test-http-report'
]);
app.factory('authRecoverer', ['$q', '$injector', '$location', function ($q, $injector, $location) {
    var sessionRecoverer = {
        responseError: function (response) {
            //403
            if (response.status == '401') {
                top.location.href = "http://perftest.oa.qianworks.com/#/401";
            }
            return true;
        }
    };
    return sessionRecoverer;
}]);
app.config(['$routeProvider', '$locationProvider','$httpProvider',function($routeProvider, $locationProvider,$httpProvider) {
	$httpProvider.interceptors.push('authRecoverer');
	$routeProvider.when('/401', {
    	templateUrl : '401.html'
    })
    .when('/testInterface', {
    	templateUrl : 'views/templates/test-interface/list.html',
    	controller : 'TestInterfaceController'
    })
    .when('/testInterface/add', {
    	templateUrl : 'views/templates/test-interface/form.html',
    	controller : 'TestInterfaceAddController'
    })
    .when('/testInterface/modify/:id', {
    	templateUrl : 'views/templates/test-interface/form.html',
    	controller : 'TestInterfaceModifyController'
    })
		.when('/testHttpRequest', {
			templateUrl: 'views/templates/test-http/list.html',
			controller: 'TestHttpRequestController'
		})
		.when('/testHttpRequest/add', {
			templateUrl: 'views/templates/test-http/form.html',
			controller: 'TestHttpRequestAddController'
		})
		.when('/testHttpRequest/modify/:id', {
			templateUrl: 'views/templates/test-http/form.html',
			controller: 'TestHttpRequestModifyController'
		})
    .when('/testCase', {
    	templateUrl : 'views/templates/test-interface-case/list.html',
    	controller : 'TestCaseController'
    })
    .when('/testCase/add', {
    	templateUrl : 'views/templates/test-interface-case/form.html',
    	controller : 'TestCaseAddController'
    })
    .when('/testCase/modify/:id', {
    	templateUrl : 'views/templates/test-interface-case/form.html',
    	controller : 'TestCaseModifyController'
	})
		.when('/testHttpCase', {
			templateUrl: 'views/templates/test-http-case/list.html',
			controller: 'TestHttpCaseController'
		})
		.when('/testHttpCase/add', {
			templateUrl: 'views/templates/test-http-case/form.html',
			controller: 'TestHttpCaseAddController'
		})
		.when('/testHttpCase/modify/:id', {
			templateUrl: 'views/templates/test-http-case/form.html',
			controller: 'TestHttpCaseModifyController'
    })
    .when('/testResult/:testCaseId/:host/:interfaceName/:methodName/:clientCount/:messageCount', {
    	templateUrl : 'views/templates/test-result/list.html',
    	controller : 'TestResultController'
    })
    .when('/testReport/:testCaseId/:host/:interfaceName/:methodName/:clientCount/:messageCount/:resultId/:sumTime/:maxRequestTime/:minRequestTime/:avgRequestTime/:successCount/:failCount/:qps', {
    	templateUrl : 'views/templates/test-report/report.html',
    	controller : 'TestReportController'
	})
		.when('/testHttpResult/:testHttpCaseId/:url/:requestType/:clientCount/:messageCount', {
			templateUrl: 'views/templates/test-http-result/list.html',
			controller: 'TestHttpResultController'
		})
		.when('/testHttpReport/:testCaseId/:url/:requestType/:parameters/:clientCount/:messageCount/:resultId/:sumTime/:maxRequestTime/:minRequestTime/:avgRequestTime/:successCount/:failCount/:qps', {
			templateUrl: 'views/templates/test-http-report/report.html',
			controller: 'TestHttpReportController'
    })
	.otherwise({
		redirectTo : '/index'
	});
}]);
app.run(['$rootScope','$http', '$location', '$interval','$uibModal', function($rootScope, $http, $location, $interval, $uibModal,Session) {

	$http.get('auth/menu/')
		.success(function(data) {
			if (data.data.name == "") {
				window.location.href = "http://oa.qianworks.com/?url=" + $location.absUrl();
			}
			
			$rootScope.gridData = data.data.menu;
			$rootScope.user = data.data.name;
		})
		.error(function(data) {
			window.location.href = "http://oa.qianworks.com/?url=" + $location.absUrl();
        });


	$rootScope.progressValue = 0;

	$rootScope.$on('$routeChangeStart', function(newV) {
		$rootScope.progressValue = 0;
		var pathSplit = $location.path().split('/');
		$rootScope.path = '#';
		for(var index = 1; index < pathSplit.length; index++) {
			$rootScope.path = $rootScope.path + '/' + pathSplit[index];
		}
//        $rootScope.path = '#/' + $location.path().split('/')[1];
        $rootScope.showProgress = true;
        var value = $rootScope.progressValue;
        var progress = $interval(function() {
        	if($rootScope.progressValue == 100) {
        		$interval.cancel(progress);
        		$rootScope.showProgress = false;
        		return;
        	}
        	value = value + 1;
        	if(value == 100) {
        		value = 90;
        	}
        	$rootScope.progressValue = value;
      	}, 10);
    });

    $rootScope.$on('$routeChangeSuccess', function(newV) {
        $rootScope.progressValue = 100;
       //  $interval(function() {
       //  	$rootScope.progressValue = $rootScope.progressValue + 10;
       //  	if($rootScope.progressValue == 100) {
       //  		$rootScope.progressValue = 99;
       //  	}
      	// }, 100);
    });

    $rootScope.alert = function(title, msg, action) {
    	var alertScope = $rootScope.$new();
    	alertScope.title = title;
    	alertScope.msg = msg;
    	alertScope.action = action;
		$uibModal.open({
			animation : true,
			templateUrl : 'views/common/alert_window.html',
			controller : 'AlertController',
			size : 'sm',
			scope : alertScope
		});
    };

    $rootScope.confirm = function(title, msg, action, cancelled) {
    	var confirmScope = $rootScope.$new();
    	confirmScope.title = title;
    	confirmScope.msg = msg;
    	confirmScope.action = action;
    	confirmScope.cancelled = cancelled;
		$uibModal.open({
			animation : true,
			templateUrl : 'views/common/confirm_window.html',
			controller : 'ConfirmController',
			size : 'sm',
			scope : confirmScope
		});
    };
    $rootScope.initSelectMachinePage = function (){
		$rootScope.selectMachineIpList = [];
		$rootScope.selectMachineIpArray = [];
		$rootScope.selectMachineIdArray = [];
		$rootScope.selectMachineIpString = '';
		$rootScope.selectMachineIdString = '';
		$rootScope.selectMachineButText = '...';
		$rootScope.selectMachineEnv = '';
		$rootScope.selectMachineReadOnly = false;
    };
}]);
app.config(['$httpProvider',function($httpProvider) {

	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	// Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            //if(obj instanceof Array) {
            //    for(arrIndex in obj){
            //        value = obj[arrIndex];
            //        query += param(innerObj) + '&';
            //    }
            //}
            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
    }];
}]);
