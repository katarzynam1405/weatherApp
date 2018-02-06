export default function renderOutput(data) {
  var output = document.body.querySelector('.output');
  console.log(data.forecastday);
  data.forecastday.forEach((item) => {
    console.log(item);
  })
}
