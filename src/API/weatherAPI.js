var API_KEY = "65a60f93dbd37688";

export default function weatherAPI(lat, long) {
  console.log(lat, long);
    return new Promise((resolve, reject) => {
        resolve(
            fetch('http://api.wunderground.com/api/'+ API_KEY + '/forecast/q/'+lat+','+long + '.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
              return data.forecast.simpleforecast;
            })
          );
    });
}
