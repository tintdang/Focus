 
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

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: userLocation, "accuracy": 50,
    zoom: 15

  });
console.log(userLocation);
  infowindow = new google.maps  .InfoWindow();
  service = new google.maps.places.PlacesService(map);
  findPlaces('cafe');
  findPlaces('library');
}

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
        createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
 

console.log(place);
  google.maps.event.addListener(marker, 'click', function() {
    infowindow = new google.maps.InfoWindow();
    infowindow.setContent(place.name + "</br>" + place.vicinity);
    infowindow.open(map, this);
  });
}