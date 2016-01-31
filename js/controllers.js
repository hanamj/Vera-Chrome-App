angular.module('VeraApp.controllers', [])

.controller('mainApp', function($scope, Units, $timeout) {
	$scope.init = function () {
		$scope.state = {}
		$scope.devices = {}
		$scope.scenes = {}
		$scope.rooms = []
		$scope.creds = {user: "", pass: ""}
		$scope.reloading = true;
		$scope.timestamps = {dataversion: 0, loadtime: 0}

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
					$scope.timestamps.dataversion = data.data.dataversion
					$scope.timestamps.loadtime = data.data.loadtime

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

	$scope.fullRefresh = function () {

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
			//TODO: Error check
			//console.log(res)
		})
	}

	$scope.changeDim = function (d) {
		var oldlevel = d.level
		$timeout(function () {
			if (d.level == oldlevel) {
				d.loading = true
				Units.setLevel($scope.state.active_server, $scope.state.serialNumber, $scope.creds.user, $scope.creds.pass, d.id, d.level).then(function (res) {
					d.loading = false
					//TODO: Error check
					//console.log(res)
				})
			}

		}, 1000)
	}

	$scope.checkForUpdates = function () {
		Units.getUpdates($scope.state.active_server, $scope.state.serialNumber, $scope.creds.user, $scope.creds.pass, $scope.timestamps).then(function (res) {
			//console.log(res)
			$scope.timestamps.dataversion = res.data.dataversion
			$scope.timestamps.loadtime = res.data.loadtime

			if (res.data.full == 1) {
				console.log("Update Loop: Full Update Needed...refreshing all")
				$scope.init()
			} else if (res.data.devices) {
				console.log("Update Loop: " + res.data.devices.length + " Device Updates")
				angular.forEach(res.data.devices, function(nd, key) {

					//First, find the matching device in scope
					if (nd.state == 4) {
						angular.forEach($scope.devices, function(od, key) {
							if (od.id == nd.id) {
								//Copy over new properties
								Object.keys(nd).forEach(function(key,index) {
								    if ((key in nd) && (key in od)) {
								        od[key] = nd[key]
								    }
								})
							}
						})
					}
				})
			} else {
				console.log("Update Loop: No Updates")
			}

			$timeout(function () {
				$scope.checkForUpdates()
			}, 10)
		})
	}

	//Kick things off
	$scope.init()

	$timeout(function () {
		console.log("Starting Update Loop")
		$scope.checkForUpdates()
	}, 5000)
})
