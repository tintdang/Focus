function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.307182,
            lng: -97.755996
        },
        zoom: 12,
        styles: [{
            featureType: 'poi',
            stylers: [{
                visibility: 'off'
            }] // Turn off POI.
        },
        {
            featureType: 'transit.station',
            stylers: [{
                visibility: 'off'
            }] // Turn off bus, train stations etc.
        }
        ],
        disableDoubleClickZoom: true,
        streetViewControl: false,

    });

    var positionLat;
    var positionLng;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            positionLat = position.coords.latitude;
            positionLng = position.coords.longitude;

            var image = 'assets/photos/star32.png';

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: image,
                title: "geolocation"
            });

            marker.setMap(map);
            map.setCenter(pos);
            return pos;

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });

    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    var markers = [{
            coords: {
                lat: 30.2560821,
                lng: -97.74623480000002
            },
            title: "Beannu Coffee",
            phone_number:"(512) 448-3919",
            location: "515 S Congress Ave, 78704",
            hours: "Open 24 hours",
            peak_hours: "8pm-12pm"
            
        }
        ,{
            coords: {
                lat: 30.2798033,
                lng: -97.71958940000002
            },
            title: "Beannu Coffee",
            phone_number:"(512) 478-4700",
            location: "2001 E Martin Luther King Jr Blvd, 78702",
            hours: "Open 24 hours",
            peak_hours: "8pm-12pm"    
        }
        ,{
            coords: {
                lat: 30.2952454,
                lng: -97.78439839999999
            },
            title: "Mozart's Coffee Roasters",
            phone_number:"(512) 477-2900",
            location: "3825 Lake Austin Blvd, 78703",
            hours: "Mon-Fri 7am-12am, Sat-Sun 8am-12am",
            peak_hours: "9pm-10pm"    
        }
        ,{
            coords: {
                lat: 30.2510597,
                lng: -97.74937319999998
            },
            title: "Jo's Coffee",
            phone_number:"(512) 444-3800",
            location: "1300 S Congress Ave, 78704",
            hours: "Mon-Sun 7am-9pm",
            peak_hours: "10am-12pm"    
        }
        ,{
            coords: {
                lat: 30.2651039,
                lng: -97.74612919999998
            },
            title: "Jo's Coffee",
            phone_number:"(512) 469-9003",
            location: "4160, 242 W 2nd St, 78701",
            hours: "Mon-Sun 7am-9pm",
            peak_hours: "10am-12pm"    
        }
        ,{
            coords: {
                lat: 30.2952454,
                lng: -97.78439839999999
            },
            title: "Austin Java",
            phone_number: "(512) 481-9400",
            location: "Suite 100, 301 W 2nd St, 78701",
            hours: "Mon-Thurs 7am-8pm, Fri 7am-9pm, Sat-Sun 8am-9pm",
            peak_hours: "8am-10am"

        }
        ,{
            coords: {
                lat: 30.2660703,
                lng: -97.76913479999996
            },
            title: "Zilker Metropolitan Park",
            phone_number:"(512) 974-6700",
            location: "2100 Barton Springs Rd, 78704",
            hours: "Mon-Sat 5am-10pm",
            peak_hours: "8pm-10pm"    
        }
        ,{
            coords: {
                lat: 30.2854287,
                lng: -97.7404176
            },
            title: "Architecture and Planning Library",
            phone_number:" (512) 495-4620",
            location: "Battle Hall, 302 Inner Campus Drive #200, 78712",
            hours: "Mon-Thu 9am-10pm, Sat CLOSED, Sun 1pm-10pm",
            peak_hours: "12pm-3pm"    
        },{
            coords: {
                lat: 30.28613379999999,
                lng: -97.73937660000001
            },
            title: "Life Science Library",
            phone_number:"(512) 495-4630",
            location: "Main, 2400 Inner Campus Drive #220, 78712",
            hours: "Mon-Fri 7am-12am, Sat-Sun 8am-12am",
            peak_hours: "12pm-3pm"    
        },{
            coords: {
                lat: 30.2834575,
                lng: -97.73727020000001
            },
            title: "Perry-Castañeda Library",
            phone_number:"(512) 495-4250",
            location: "101 E 21st St, 78712",
            hours: "Mon-Fri 7am-10pm, Sat 10am-10pm, Sun 11am-10pm",
            peak_hours: "11am-4pm"    
        
    }]

    
    for (var j = 0; j < markers.length; j++) {
        createMarker(j);
    };

    function createMarker(i) {

        var iconImage = "assets/photos/study.png"

        var marker = new google.maps.Marker({
            position: markers[i].coords,
            map: map,
            icon: iconImage,
            title: markers[i].title,
            phone_number: markers[i].phone_number,
            location: markers[i].location,
            hours: markers[i].hours,
            peak_hours: markers[i].peak_hours
        });
        
        marker.setIcon(iconImage);
        marker.setMap(map);

        var infoWindow = new google.maps.InfoWindow({

            content: '<div id="infoWindow">'
                + '<div id="bodyContent">'

                    + '<h6>' + "Name: " + marker.title + '</h6>'
                    + '<h6>' + "Phone Number:" + marker.phone_number + '</h6>'
                    + '<h6>' + "Location: " + marker.location + '</h6>'
                    + '<h6>' + "Hours: " + marker.hours + '</h6>'
                    + '<h6>' + "Peak hours: " + marker.peak_hours + '</h6>'
                 
                + '</div>'
        });

        // $(document).on("click", ".more-info", function () {
        //     var key = $(this).attr("data-key");
        //     console.log($(this).attr("data-key"));
        //     sessionStorage.setItem("key", key);
        // });

        marker.addListener('click', function(e) {
            
            infoWindow.open(map, marker);
        });
            

    }; // End createMarker

}; // End initMap

