app.factory('commonService',['$q','$http',function($q, $http){
	return({
		authCheckBySns : function(snsList) {
			var url = '/auth/sns';
			var deferred = $q.defer();
			var promise =  $http.get(url,{params: {sns:snsList}}).then(function(response) {
				return response;
			},function(response){
				return response;
			});
			return promise;
		},
		getPrivilegeByMenuId : function(menuId) {
			var url = 'search/user/getUserPriOfMenu';
			var deferred = $q.defer();
			var promise =  $http.post(url,{"menuId":menuId}).then(function(response) {
				return response;
			},function(response){
				return response;
			});
			return promise;
		},
		handleUnauthorize: function(obj) {
			if(obj.status == '401') {
                $location.path('401.html');
			}
		}
	})
}]);