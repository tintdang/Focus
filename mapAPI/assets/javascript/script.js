 
var map;
var infowindow;
var service;
var userLocation;
var queryUrl = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB0N9-tpLZLryr1_wcWc2EGbNcqnwRbQG0";

$.ajax({
    url: queryUrl,
    method: "POST",

}).then(function(response){
  userLocation = response.location;
  initMap();

});

//initializes map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: userLocation, "accuracy": 50,
    zoom: 15
  });

  infowindow = new google.maps  .InfoWindow();
  service = new google.maps.places.PlacesService(map);
  //runs findPlaces functions for nearby cafe's and libraries
  findPlaces('cafe');
  findPlaces('library');
}
// function that can find any "type" of nearby place
function findPlaces(x){
  service.nearbySearch({
    location: userLocation, 
    accuracy: 50,
    radius: 7000,
    type: [x],
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < 4; i++) {
        // creates marker on map for nearby places
        createMarker(results[i]);
    }
  }
}
//function for creating a marker
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
 //function for bringing up location name
  google.maps.event.addListener(marker, 'click', function() {
    infowindow = new google.maps.InfoWindow();
    console.log(infowindow);
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
