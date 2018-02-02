import weatherAPI from './API/weatherAPI';
import geolocation from './geolocation/geolocation';
import {showOnMap, findCityOnMap} from './API/googleMapAPI';

var GoogleMapsLoader = require('google-maps');
var map; 
GoogleMapsLoader.load(function(google) {
  var myLatLng = {lat: 52.158742, lng: 18.120850};
  map = new google.maps.Map(document.querySelector('#googleMap'), {center: myLatLng, zoom: 6});
});
GoogleMapsLoader.KEY = 'AIzaSyDUrcoLs6wrba-vb9YGlEeItYXsJ_8S5FA';

var buttonIcon = document.querySelector('#btnGetLoc');
var select = document.querySelector('#citys');
var cityQuery = document.querySelector('#searchCity');
var output = document.querySelector('.output');

function onGeolocationSuccess(position) {
    console.log(position.coords.latitude, position.coords.longitude);
    showOnMap(position.coords.latitude, position.coords.longitude, 13, map);
    weatherAPI(position.coords.latitude, position.coords.longitude).catch(e => alert(e.errorMessage));
}

function onGeolocationError(positionError) {
    console.log(positionError, positionError.message);
    alert(positionError.message);
}

buttonIcon.addEventListener('click', onClickHandler);

function onClickHandler() {
    geolocation().then(onGeolocationSuccess).catch(onGeolocationError);
};

weatherAPI().then(showData).catch(e => alert(e));

function showData( data ) {
  data.forEach((item) => {    
  output.innerHTML = item.main.temp;
});
}

cityQuery.addEventListener('change', function(){
  findCityOnMap(this.value, 'Pl', map);
})

// select.addEventListener('change', function () {
//     var lat = this.options[this.selectedIndex].getAttribute('data-lat');
//     var long = this.options[this.selectedIndex].getAttribute('data-long');
//     console.log(map);
//     showOnMap(lat, long, 10, map);
//     weatherAPI(lat, long);
//     // findCityOnMap('Legnica', 'Pl', map);
// })