import newsAPI from './API/newsAPI';
import weatherAPI from './API/weatherAPI';
import renderNews from './renderOutput/renderNews';
import geolocation from './geolocation/geolocation';
import renderOutput from './renderOutput/renderOutput';
import {showOnMap, findCityOnMap, placeMarkerAndPanTo} from './API/googleMapAPI';
import celciusConverter from './tempConverter/tempConverter';

var GoogleMapsLoader = require('google-maps');
var map;
var marker;
GoogleMapsLoader.load(function(google) {
  var myLatLng = {lat: 52.158742, lng: 18.120850};
  map = new google.maps.Map(document.querySelector('#googleMap'), {center: myLatLng, zoom: 6});

  google.maps.event.addListener(map, "click", function (e) {
    if(marker !== undefined){
      marker.setMap(null);
    }
    marker = placeMarkerAndPanTo(e.latLng, map);

    weatherAPI(e.latLng.lat(), e.latLng.lng()).then(renderOutput).then(newsAPI().then(renderNews)).catch(e => alert(e.errorMessage));
  });
});
GoogleMapsLoader.KEY = 'AIzaSyDUrcoLs6wrba-vb9YGlEeItYXsJ_8S5FA';

var buttonIcon = document.querySelector('#btnGetLoc');
var select = document.querySelector('#citys');
var cityQuery = document.querySelector('#searchCity');
var output = document.querySelector('.output');

function onGeolocationSuccess(position) {
    if(marker !== undefined){
      marker.setMap(null);
    }
    marker = showOnMap(position.coords.latitude, position.coords.longitude, 13, map);
    weatherAPI(position.coords.latitude, position.coords.longitude).then(renderOutput).then(newsAPI().then(renderNews)).catch(e => alert(e.errorMessage));
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
  weatherAPI(map.center.lat(), map.center.lng()).then(renderOutput).then(newsAPI().then(renderNews)).catch(e => alert(e.errorMessage));
});

renderOutput(data);
renderNews(data)
