angular.module('VeraApp.services', [])

.factory('Units', function($http, $rootScope) {
  return {
    get: function() {
      return $http.get('https://sta1.mios.com/locator_json.php');
    },
    status: function() {
      return $http.get('https://' + $rootScope.creds.server + '/' + $rootScope.creds.user + '/' + $rootScope.creds.pass + '/' + $rootScope.creds.unit + '/data_request?id=lu_sdata');
    },
    runScene: function(id) {
    	//http://' + ip + ':3480/data_request?id=action&output_format=json&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunScene&SceneNum=
    	return $http.get('https://' + $rootScope.creds.server + '/' + $rootScope.creds.user + '/' + $rootScope.creds.pass + '/' + $rootScope.creds.unit + '/data_request?id=action&output_format=json&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunScene&SceneNum=' + id);
    },
    setPower: function(did, state) {
	    return $http.get('https://' + $rootScope.creds.server + '/' + $rootScope.creds.user + '/' + $rootScope.creds.pass + '/' + $rootScope.creds.unit + '/data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:SwitchPower1&output_format=json&DeviceNum=' + did + '&action=SetTarget&newTargetValue=' + state);	
    },
    setLevel: function(did, level) {
      return $http.get('https://' + $rootScope.creds.server + '/' + $rootScope.creds.user + '/' + $rootScope.creds.pass + '/' + $rootScope.creds.unit + '/data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:Dimming1&output_format=json&DeviceNum=' + did + '&action=SetLoadLevelTarget&newLoadlevelTarget=' + level); 
    },
    getUpdates: function(timestamps) {
      return $http.get('https://' + $rootScope.creds.server + '/' + $rootScope.creds.user + '/' + $rootScope.creds.pass + '/' + $rootScope.creds.unit + '/data_request?id=lu_sdata&loadtime=' + timestamps.loadtime + '&dataversion=' + timestamps.dataversion + '&timeout=5');
    }
  }
})