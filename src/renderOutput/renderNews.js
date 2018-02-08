export default function renderNews(news) {
  var topNews = news.slice(0,5);
  var output = document.querySelector('.news-output')
  topNews.forEach((item) => {
    var li = document.createElement('li');
    var author = document.createElement('p');
    var title = document.createElement('p');
    var description = document.createElement('p');
    var link = document.createElement('a');
    author.classList.add('news-author');
    title.classList.add('news-title');
    description.classList.add('news-description');
    link.classList.add('news-url');
    author.innerHTML = item.author;
    title.innerHTML = item.title;
    description.innerHTML = item.description;
    link.innerHTML = item.url;
    li.appendChild(author);
    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(link);
    output.appendChild(li);
  })
}
