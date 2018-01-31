var API_KEY = "0a883b3762d5d823647ce4d06197a941";

export default function weatherAPI(latitude, longitude) {
    return new Promise((resolve, reject) => {
        resolve(
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=51.122049999999994&lon=16.976121&APPID=0a883b3762d5d823647ce4d06197a941`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
              return data.list;
            })
          )
    })
}
