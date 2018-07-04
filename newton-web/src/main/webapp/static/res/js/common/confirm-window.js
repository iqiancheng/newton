app.controller('ConfirmController',['$scope','$uibModalInstance', function ($scope, $uibModalInstance) {

  $scope.ok = function () {
	  if($scope.action){
		  $scope.action();
	  }
	  $uibModalInstance.close();
  };

  $scope.cancel = function () {
	  if($scope.cancelled){
		  $scope.cancelled();
	  }
	  $uibModalInstance.close();
  };
}]);