let co_x;let co_y;

let apply = document.getElementById("Apply");
apply.addEventListener("click",findLocation);

function findLocation() {
    co_x = document.getElementById("num1").value;

    co_y = document.getElementById("num2").value;
    console.log("x: "+co_x +" y: "+co_y);
    geolocationShow();
}

let xx = document.getElementById("ans");

function geolocationShow(longitude,latitude) {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    } else{

        xx.innerText = "Geolocation is not supported by browser";
    }
}
function showPosition(position) {
    xx.innerHTML = "<span>Latitude:</span> " +"<span class='sp3'> " +  position.coords.latitude +"</span>" +
        "<br><span>Longitude:</span>  " + "<span class='sp3'> " + position.coords.longitude +"</span>";
    document.getElementById("num1").value = position.coords.latitude;
    document.getElementById("num2").value = position.coords.longitude;
    document.getElementById("text01").value = position.coords.latitude +","+position.coords.longitude;
}


let findMap = document.getElementById("findMap");
findMap.addEventListener("click",initMap);


var map, infoWindow;
function initMap() {
    let co_x1 = document.getElementById("num1").value;

   let  co_y1 = document.getElementById("num2").value;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:parseFloat(co_x1) , lng:parseFloat(co_y1) },
        zoom: 14
    });

    infoWindow = new google.maps.InfoWindow;

    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: parseFloat(co_x1),
                lng: parseFloat(co_y1)
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Current Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
            var currentPlace = {lat:parseFloat(co_x1), lng:parseFloat(co_y1) };
            var marker = new google.maps.Marker({position: currentPlace, map: map});
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


var map1;
var service;
var infowindow;
let findLocation1 = document.getElementById("findMapLocation");
findLocation1.addEventListener("click",initMap1);
function initMap1() {
    let co_x1 = document.getElementById("num1").value;

    let  co_y1 = document.getElementById("num2").value;

    let findPlace = document.getElementById("text1").value;

    document.getElementById("text02").value = findPlace;

    if (co_x1 === "" && co_y1 === ""){
        return;
    }
    var sydney = new google.maps.LatLng(co_x1, co_y1);

    infowindow = new google.maps.InfoWindow();

    map1 = new google.maps.Map(
        document.getElementById('map'), {center: sydney, zoom: 15});

    var request = {
        query: `${findPlace}`,
        fields: ['name', 'geometry'],
    };

    service = new google.maps.places.PlacesService(map1);

    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }

            map1.setCenter(results[0].geometry.location);
        }
    });


}


function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map1,
        position: place.geometry.location
    });

    let co_x1 = document.getElementById("num1").value;

    let  co_y1 = document.getElementById("num2").value;
    var currentPlace = {lat:parseFloat(co_x1), lng:parseFloat(co_y1) };
    var marker11 = new google.maps.Marker({position: currentPlace, map: map1});

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map1, this);
    });
}


var findDistance = document.getElementById("findPlaceDistance");

findDistance.addEventListener("click",initMap2);
function initMap2() {
    let d1 = document.getElementById("text01").value;
    let d2 = document.getElementById("text02").value;
    if (d1 === "" || d2 === ""){
        return;
    }

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map33 = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: parseFloat(co_x), lng:parseFloat(co_y) }
    });
    directionsDisplay.setMap(map33);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
    
}
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: document.getElementById("text01").value,
        destination: document.getElementById("text02").value,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}