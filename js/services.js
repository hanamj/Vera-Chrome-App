angular.module('VeraApp.services', [])

.factory('Units', function($http) {
  return {
    get: function() {
      return $http.get('https://sta1.mios.com/locator_json.php');
    },
    status: function(fwd, unit, user, pass) {
      return $http.get('https://' + fwd + '/' + user + '/' + pass + '/' + unit + '/data_request?id=lu_sdata');
    },
    runScene: function(fwd, unit, user, pass, id) {
    	//http://' + ip + ':3480/data_request?id=action&output_format=json&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunScene&SceneNum=
    	return $http.get('https://' + fwd + '/' + user + '/' + pass + '/' + unit + '/data_request?id=action&output_format=json&serviceId=urn:micasaverde-com:serviceId:HomeAutomationGateway1&action=RunScene&SceneNum=' + id);
    },
    setPower: function(fwd, unit, user, pass, did, state) {
	    return $http.get('https://' + fwd + '/' + user + '/' + pass + '/' + unit + '/data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:SwitchPower1&output_format=json&DeviceNum=' + did + '&action=SetTarget&newTargetValue=' + state);	
    }
  }
})