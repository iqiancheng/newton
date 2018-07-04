app.controller('AlertController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

  $scope.ok = function () {
	  if($scope.action){
		  $scope.action();
	  }
	  $uibModalInstance.close();
  };
  
}]);