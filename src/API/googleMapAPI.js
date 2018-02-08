export function showOnMap(latitude, longitude, zoom, map) {
  var myLatLng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
  map.panTo(myLatLng);
  map.setZoom(zoom);

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
  return marker;
}

export function findCityOnMap(city, countryCode, myMap){
	var address = city ;//+ ', ' + countryCode;
  var myLatLng;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var Lat = results[0].geometry.location.lat();
      var Lng = results[0].geometry.location.lng();
      console.log('Lat: ' + Lat + ' Lng: ' + Lng);
      myLatLng = {lat: Lat, lng: Lng};
      myMap.setZoom(13);
      myMap.panTo(myLatLng);
    } else {
      alert("Something go wrong " + status);
    }
  });
  return myLatLng;
}

export function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
  return marker;
}
