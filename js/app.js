angular.module('VeraApp', ['ngMaterial', 'VeraApp.controllers', 'VeraApp.services'])

.config(function($mdThemingProvider) {
  	$mdThemingProvider.theme('default')
  		.primaryPalette('blue-grey')
  		.warnPalette('orange')
    	.accentPalette('green')
})