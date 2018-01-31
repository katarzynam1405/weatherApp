import weatherAPI from './API/weatherAPI';
import geolocation from './geolocation/geolocation';
var buttonIcon = document.querySelector('button.button.icon');
var select = document.querySelector('#citys');
var output = document.querySelector('.output');

function onGeolocationSuccess(position) {
    console.log(position.coords.latitude, position.coords.longitude);
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

select.addEventListener('change', function () {
    var lat = this.options[this.selectedIndex].getAttribute('data-lat');
    var long = this.options[this.selectedIndex].getAttribute('data-long');
    console.log(lat, long);
    weatherAPI(lat, long);
  })
