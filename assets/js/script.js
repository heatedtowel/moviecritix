var searchEL = document.querySelector('#search')
var mobSearchEL = document.querySelector('#mobSearch')
var searchBtnEL = document.querySelector('#searchBtn')
var mobSearchBtnEL = document.querySelector('#mobSearchBtn')
var randomBtnEL = document.querySelector('#randomBtn')
var mobRandomBtnEL = document.querySelector('#mobRandomBtn')
var parentGifEL = document.querySelector('#parentGif')
var posterEL = document.querySelector('#poster')
var movieTitleEL = document.querySelector('#movieTitle')
var movieInfoEL = document.querySelector('#movieInfo')
var reviewsEL = document.querySelector('#reviews')
var moreInfoEL = document.querySelector('#moreInfoParent')
var prevSearchEL = document.querySelector('#prevSearch')
var omdbKey = 'trilogy'
var giphKey = 'nw35KvBZSmb4OKNw51Qur35t2fh1nqob'
var imdbKey = 'k_s2t87b78'
var movName = ''
var currentSearch = []

function init() {
  randomMovie();
  displayPrevSearches();
}


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
      parentGifEL.innerHTML = html
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
      movieTitleEL.textContent = `${data.Title} ${data.Runtime}`
      posterEL.setAttribute('src', data.Poster)
      reviews = gatherReviews(data);
      reviewsEL.innerHTML = makeReviews(reviews)
      moreInfoEL.innerHTML = makeMoreInfo(data.Writer, data.Language, data.Country, data.DVD, data.BoxOffice)
      movieInfoEL.innerHTML = makemovieInfoEL(data.Director, data.Actors, data.Genre, data.Rated, data.Released, data.Awards, data.Plot)
    })
    .catch((err) => {
      movName = 'spider-man'
      omdbCall();
      giphyCall();
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
    html += `<h5 id='moreInfo'>${data[i].Score} ${data[i].Source}</h5>`
  }
  return html
}

function gatherReviews(data) {
  reviewData = []

  for (var i = 0; i < data.Ratings.length; i++) {
    reviewDataNew =
      {
        'Source': data.Ratings[i].Source,
        'Score': data.Ratings[i].Value
      }
    reviewData.push(reviewDataNew);
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

function makemovieInfoEL(director, actors, genre, rated, released, awards, plot) {
  return `<h4 id='moreInfo'>${plot}</h4>
  <h5>Director: ${director}</h5>
  <h5>Actors: ${actors}</h5>
  <h5>Genre: ${genre}</h5>
  <h5>Rating: ${rated}</h5>
  <h5>Released: ${released}</h5>
  <h5 id='moreInfo'>${awards}</h5>`
};

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

searchBtnEL.addEventListener('click', input => {
  movName = searchEL.value
  saveSearch(movName);
  handleSearch();
});

mobSearchBtnEL.addEventListener('click', input => {
  movName = mobSearchEL.value
  saveSearch(movName);
  handleSearch();
});

randomBtnEL.addEventListener('click', input => {
  randomMovie();
});

mobRandomBtnEL.addEventListener('click', input => {
  randomMovie();
});

function displayPrevSearches() {
  var savedSearches = JSON.parse(localStorage.getItem('title'))
  for (var i = 0; i < savedSearches.length; i++) {
    prevSearchEL.innerHTML += `<option value="${savedSearches[i].Title}"></option>`
  }
}

function saveSearch(data) {
  var currentSearchNew = 
    {
      'Title': data
    }
  currentSearch.push(currentSearchNew)
  localStorage.setItem('title', JSON.stringify(currentSearch))
}

init();
