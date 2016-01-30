angular.module('BlankApp', ['ngMaterial'])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  	.primaryPalette('grey')
    .accentPalette('orange')
    .dark();
})