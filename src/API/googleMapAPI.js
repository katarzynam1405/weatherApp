export function showOnMap(latitude, longitude, zoom, map) {
  var myLatLng = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
  map.setCenter(myLatLng);
  map.setZoom(zoom);

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });
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
      myMap.setCenter(myLatLng);
    } else {
      alert("Something got wrong " + status);
    }
  });
  return myLatLng;
}