export default function renderOutput(data) {
  var output = document.body.querySelector('.weather-output');
  output.innerHTML = '';
  data.forecastday.forEach((item) => {
    console.log(item);
    var div = document.createElement('div');
    var condition = document.createElement('div');
    var date = document.createElement('div');
    var temp = document.createElement('div');
    var snow = document.createElement('div');
    var icon = new Image();
    div.classList.add('weather-container');
    condition.classList.add('weather-condition');
    date.classList.add('weather-date');
    temp.classList.add('weather-temp');
    icon.classList.add('weather-icon');
    snow.classList.add('weather-snow');
    condition.innerHTML += item.conditions;
    date.innerHTML += item.date["pretty"];
    temp.innerHTML += item.high["celsius"] + ' &#176;	Celsius';
    snow.innerHTML += 'Snow: ' + item.snow_allday["cm"] + ' cm';
    icon.src = item.icon_url;
    div.appendChild(date);
    div.appendChild(condition);
    div.appendChild(temp);
    div.appendChild(icon);
    div.appendChild(snow);
    output.appendChild(div);
  })
}
