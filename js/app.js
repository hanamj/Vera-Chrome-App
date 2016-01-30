angular.module('BlankApp', ['ngMaterial'])

.config(function($mdThemingProvider) {
  	$mdThemingProvider.theme('default')
  		.primaryPalette('blue-grey')
  		.warnPalette('orange')
    	.accentPalette('blue-grey')
    console.log($mdThemingProvider.theme('default'))
})