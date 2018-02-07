import weatherAPI from './API/weatherAPI';
import geolocation from './geolocation/geolocation';
import renderOutput from './renderOutput/renderOutput';
import {showOnMap, findCityOnMap} from './API/googleMapAPI';
import celciusConverter from './tempConverter/tempConverter';

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
    showOnMap(position.coords.latitude, position.coords.longitude, 13, map);
    weatherAPI(position.coords.latitude, position.coords.longitude).then(renderOutput).catch(e => alert(e.errorMessage));
}

function onGeolocationError(positionError) {
    console.log(positionError, positionError.message);
    alert(positionError.message);
}

buttonIcon.addEventListener('click', onClickHandler);

function onClickHandler() {
    geolocation().then(onGeolocationSuccess).catch(onGeolocationError);
};

cityQuery.addEventListener('change', function(){
  findCityOnMap(this.value, 'Pl', map);
  weatherAPI(map.center.lat(), map.center.lng()).then(renderOutput).catch(e => alert(e.errorMessage));
});

renderOutput(data);
