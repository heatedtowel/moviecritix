var searchEL = document.querySelector('#search')
var mobSearchEL = document.querySelector('#mobSearch')
var randomBtnEL = document.querySelector('#randomBtn')
var mobRandomBtnEL = document.querySelector('#mobRandomBtn')
var parentGif = document.querySelector('#parentGif')
var searchBtnEL = document.querySelector('#searchBtn')
var mobSearchBtnEL = document.querySelector('#mobSearchBtn')
var poster = document.querySelector('#poster')
var movieTitle = document.querySelector('#movieTitle')
var duration = document.querySelector('#duration')
var movieInfo = document.querySelector('#movieInfo')
var reviewsEL = document.querySelector('#reviews')
var moreInfo = document.querySelector('#moreInfoParent')
var omdbKey = 'trilogy'
var giphKey = 'nw35KvBZSmb4OKNw51Qur35t2fh1nqob'
var imdbKey = 'k_brnh9rmg'
var movName = ''

function randomMovie() {
  imdbCall();
}

function handleSearch(data) {
  searchMovie(data);
}

function searchMovie(data) {
  giphyCall(data);
  omdbCall(data);
}

function giphyCall() {
  var giphURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphKey}&q=${movName}&limit=25&offset=0&rating=g&lang=en`
  fetch(giphURL).then((response) => {
    return response.json();
  })
    .then((data) => {
      var html = ''
      for (var i = 0; i < 4; i++) {
        var random = parseInt(Math.random() * data.data.length);
        gifResult = data.data[random].images.fixed_height.url;
        html += makeGif(gifResult)
      }
      parentGif.innerHTML = html
      i++
    })
};

function omdbCall() {
  var omdbURL = `https://www.omdbapi.com/?apikey=${omdbKey}&t=${movName}`
  fetch(omdbURL).then((response) => {
    return response.json();
  })
    .then((data) => {
      var html = ''
      movieTitle.textContent = `${data.Title} ${data.Runtime}`
      poster.setAttribute('src', data.Poster)
      reviews = gatherReviews(data);
      reviewsEL.innerHTML = makeReviews(reviews)
      moreInfo.innerHTML = makeMoreInfo(data.Writer, data.Language, data.Country, data.DVD, data.BoxOffice)
      movieInfo.innerHTML = makeMovieInfo(data.Director, data.Actors, data.Genre, data.Rated, data.Released, data.Awards, data.Plot)
    })
};

function imdbCall() {
  var imdbURL = `https://imdb-api.com/en/API/Top250Movies/${imdbKey}`
  fetch(imdbURL).then((response) => {
    return response.json();
  })
    .then((data) => {
      var random = parseInt(Math.random() * data.items.length)
      var randomTitle = data.items[random].title
      movName = randomTitle
      handleSearch(movName)
    })
};

function makeGif(data) {
  return `<img id="insGif" src="${data}">`
}

function makeReviews(data) {
  html = ''
  for (var i = 0; i < data.length; i++) {
    html += `<h5 id='moreInfo'>${data[i].Rating} ${data[i].Source}</h5>`
  }
  return html
}

function gatherReviews(data) {
  reviewData = [
    {
      Source: '',
      Score: ''
    }
  ]
  for (var i = 0; i < data.Ratings.length; i++) {
    reviewData[i] = { Source: data.Ratings[i].Source, Rating: data.Ratings[i].Value };
  }
  return reviewData
}

function makeMoreInfo(writer, language, country, dvd, boxOffice) {
  return `<h5>Writer: ${writer}</h5>
  <h5>Language: ${language}</h5>
  <h5>Country: ${country}</h5>
  <h5>DVD: ${dvd}</h5>
  <h5>Boxoffice: ${boxOffice}</h5>`
}

function makeMovieInfo(director, actors, genre, rated, released, awards, plot) {
  return `<h5>Directed by: ${director}</h5>
  <h5>Actors: ${actors}</h5>
  <h5>Genre :${genre}</h5>
  <h5>Rated: ${rated}</h5>
  <h5>Released: ${released}</h5>
  <h5 id='moreInfo'>${awards}</h5>
  <h5 id='moreInfo'>${plot}</h5>`
};

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

searchBtnEL.addEventListener('click', input => {
  movName = searchEL.value
  handleSearch()
});

mobSearchBtnEL.addEventListener('click', input => {
  movName = mobSearchEL.value
  handleSearch()
});

randomBtnEL.addEventListener('click', input => {
  randomMovie();
});

mobRandomBtnEL.addEventListener('click', input => {
  randomMovie();
});

randomMovie()