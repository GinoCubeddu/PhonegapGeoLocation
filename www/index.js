var watching = false;
var watchID = null;

var locationOptions = {
	maximumAge: 10000,
	timeout: 6000,
	enableHighAccuracy: false
};


//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {

	//set up listener for button click
	$(document).on('click', getPosition);

	//change time box to show message
	$('#time').val("Press the button to get location data");

	$("#watch").on('click', watchLocation);
	$("#stopWatch").on('click', stopWatch);

});

function watchLocation() {
	$("#watching").text("Watching")
	watchID = navigator.geolocation.watchPosition(
		watchLocationSuccess, watchLocationFail, locationOptions
	)

	function watchLocationSuccess(position) {
		var time = position.timestamp;
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var altitude = position.coords.altitude;
		$("#locationHistory").append(
			"<li>" + latitude + "," + longitude + "," + altitude + " Time: " + time + "</li>"
		)
	}

	function watchLocationFail(error) {
		alert("Failed to watch the position!")
	}
}

function stopWatch() {
	if(watchID != null) {
		navigator.geolocation.clearWatch(watchID);
		$("#watching").text("Not Watching")
	}
}


//Call this function when you want to get the current position
function getPosition() {

	//change time box to show updated message
	$('#time').val("Getting data...");

	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.getCurrentPosition(successPosition, failPosition);
}


//called when the position is successfully determined
function successPosition(position) {

	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp


	//lets get some stuff out of the position object
	var time = new Date(position.timestamp);
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var altitude = position.coords.altitude;
	var accuracy = position.coords.accuracy;
	var altitudeacc = position.coords.altitudeAccuracy;
	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + time.toDateString());
	$('#lattext').val(latitude);
	$('#longtext').val(longitude);
	$('#longlatacc').val(accuracy);
	$('#altitude').val(altitude);
	$('#altitudeacc').val(altitudeacc);
}



//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);

}
