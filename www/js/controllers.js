var base_url = 'http://rahmat-emmanuel-chruch.1000unit.com/', api_url = base_url + 'restful/', upload_url = base_url + 'media/upload/';

angular.module('starter.controller',['ngSanitize','ionicLazyLoad'])

.directive('repeatDone', function() {
	return function(scope, element, attrs) {
		if (scope.$last) { // all are rendered
			scope.$eval(attrs.repeatDone);
		}
	}
})

.directive('loading',   ['$http' ,function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if(v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };

}])

.controller('dashboardController',function($rootScope,$scope,$timeout,$ionicSlideBoxDelegate,$ionicScrollDelegate,$ionicModal,$http) {
	$rootScope.base_url = base_url;
	$rootScope.api_url = api_url;
	$rootScope.upload_url = upload_url;
	$rootScope.window_height = $(window).height();
	$rootScope.window_width = $(window).width();

	$rootScope.width_box = parseInt($rootScope.window_width) - 20;
	$rootScope.height_box = parseInt(parseInt($rootScope.window_height)/2)-48;
	$rootScope.height_img = parseInt($scope.height_box)-48;

	$http.get(api_url + 'dashboard')
	.success(function(data){
		console.log(data);

		$scope.newest = data.result.newest;
		$scope.category = data.result.category;
	})
	.error(function(error){
		console.log(error);
		alert('Contact your administrator!');
	})

	var swiper = new Swiper('.swiper-container', {
	  nextButton: '.swiper-button-next',
	  prevButton: '.swiper-button-prev',
	  pagination: '.swiper-pagination',
	  paginationClickable: true,
	  preloadImages: true,
	  lazyLoading: true
	});	

	
	$scope.navActive = 'newest';
	$scope.slide_box_content_height = 200;

	$scope.slideTo = function(i){
		$ionicSlideBoxDelegate.slide(i);
	}
	$scope.slideChanged = function(){
		if($ionicSlideBoxDelegate.currentIndex() === 0) {
			$scope.slide_box_content_height = document.getElementById('newest-content').offsetHeight;
			$scope.navActive = 'newest';
		} else {
			$scope.slide_box_content_height = document.getElementById('menu-content').offsetHeight;
			$scope.navActive = 'menu';
		}
		$ionicScrollDelegate.resize();
		document.getElementById('slide-box').style.height = $scope.slide_box_content_height + "px";		
	}
})

.controller('categoryController',function($rootScope,$scope,$timeout,$ionicSlideBoxDelegate,$ionicScrollDelegate,$ionicModal,$http,$stateParams) {
	$http.get(api_url + 'category/'+$stateParams.category_id)
	.success(function(data){
		console.log(data);

		$scope.category = data.result.category;
		$scope.post = data.result.post;
		$ionicSlideBoxDelegate.update();
	})
	.error(function(){
		alert('Contact your administrator!');
	})

	$scope.slideChanged = function(){
		$ionicSlideBoxDelegate.update();
	}
})

.controller('postController',function($rootScope,$scope,$timeout,$ionicSlideBoxDelegate,$ionicScrollDelegate,$ionicModal,$http,$stateParams) {
	$http.get(api_url + 'post/'+$stateParams.post_id)
	.success(function(data){
		console.log(data);
		$scope.post = data.result.post;
	})
	.error(function(){
		alert('Contact your administrator!');
	})

	$scope.slideChanged = function(){
		$ionicSlideBoxDelegate.update();
	}
})