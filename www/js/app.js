angular.module('starter', ['ionic','starter.controller'])
.run(function($ionicPlatform,$ionicPopup) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
  $ionicPlatform.registerBackButtonAction(function () {

    var confirmPopup = $ionicPopup.confirm({
      title: 'Rahmat Emmanuel Chruch',
      template: 'You want to exit?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        navigator.app.exitApp();
      } else {
        console.log('You are not sure');
      }
    });

  },100);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('dashboard',{
    url:'/dashboard',
    templateUrl:'templates/dashboard.html',
    controller:'dashboardController'
  })

  .state('category',{
    url:'/category/:category_id',
    templateUrl:'templates/category.html',
    controller:'categoryController'
  })

  .state('post',{
    url:'/post/:post_id',
    templateUrl:'templates/post.html',
    controller:'postController'
  })

  $urlRouterProvider.otherwise('/dashboard');
})