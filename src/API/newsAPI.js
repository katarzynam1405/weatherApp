var API_KEY = "817f01565950443fa0a08728d34d4904";

export default function newsAPI() {
  console.log();
    return new Promise((resolve, reject) => {
        resolve(
            fetch('https://newsapi.org/v2/top-headlines?' +'country=us&apiKey=' + API_KEY)
            .then(function(response) {
                console.log(response);
                return response.json()
            })
            .then(function(data) {
              console.log(data.articles);
              return data.articles;
            })
          );
    });
}
