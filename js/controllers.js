angular.module('VeraApp.controllers', [])

.controller('mainApp', function($scope, Units) {
	$scope.init = function () {
		$scope.state = {}
		$scope.devices = {}
		$scope.scenes = {}
		$scope.rooms = []
		$scope.creds = {user: "", pass: ""}
		$scope.reloading = true;

		Units.get().then(function (data) {
			$scope.reloading = true
			$scope.state = data.data.units[0]
			console.log($scope.state)
			
			//Set password for now: chrome.storage.local.set({vpassword: "password", vusername: "hanamj"})
			chrome.storage.local.get(["vpassword","vusername"], function (sdata) {
				console.log("Got Credentials")
				$scope.creds.user = sdata.vusername
				$scope.creds.pass = sdata.vpassword

				Units.status($scope.state.active_server, $scope.state.serialNumber, sdata.vusername, sdata.vpassword).then(function (data) {
					console.log("Got Unit Data")
					console.log(data.data)
					$scope.devices = data.data.devices
					angular.forEach($scope.devices, function(d, key) {
						if (d.category == 3) {
							if (d.status === "1") d.on = true;
							if (d.status === "0") d.on = false;
						}
					});
					$scope.scenes = data.data.scenes

					//Build array of rooms.
					$scope.rooms = []
					angular.forEach(data.data.rooms, function(r, key) {
						$scope.rooms[r.id] = r.name
					});

					//We're done!!
					$scope.reloading = false
				})
			})
		})
	}

	$scope.runScene = function (s) {
		console.log(s)
		s.loading = true
		Units.runScene($scope.state.active_server, $scope.state.serialNumber, $scope.creds.user, $scope.creds.pass, s.id).then(function (res) {
			s.loading = false
			console.log(res)
		})
	}

	$scope.toggleDevice = function (d) {
		console.log(d)
		d.loading = true
		Units.setPower($scope.state.active_server, $scope.state.serialNumber, $scope.creds.user, $scope.creds.pass, d.id, d.status).then(function (res) {
			d.loading = false
			console.log(res)
		})
	}

	$scope.init()
})
