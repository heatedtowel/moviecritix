var movName = 'the hangover'
var parentGif = document.querySelector('#parentGif')
var poster = document.querySelector('#poster')
var movieTitle = document.querySelector('#movieTitle')
var duration = document.querySelector('#duration')
var movieInfo = document.querySelector('#movieInfo')
var moreInfo = document.querySelector('#moreInfoParent')
var omdbKey = 'trilogy'
var giphKey = 'nw35KvBZSmb4OKNw51Qur35t2fh1nqob'
var omdbURL = `http://www.omdbapi.com/?apikey=${omdbKey}&t=${movName}`
var giphURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphKey}&q=${movName}&limit=25&offset=0&rating=g&lang=en`





init();


function init() {
  searchMovie();
}


function giphyCall() {
  fetch(giphURL).then((response) => {
    return response.json();
  })
    .then((data) => {
      var html = ''
      for (var i = 0; i < 4; i++) {
        var random = parseInt(Math.random() * data.data.length);
        gifResult = data.data[random].images.original.url;
        html += makeGif(gifResult)
      }
      parentGif.innerHTML = html
      i++
    })
};

function omdbCall() {
  fetch(omdbURL).then((response) => {
    return response.json();
  })
    .then((data) => {
      var html = ''
      movieTitle.textContent = `${data.Title} ${data.Runtime}`
      poster.setAttribute('src', data.Poster)
      reviews = makeReviews(data);
      moreInfo.innerHTML = makeMoreInfo(data.Director, data.Actors, data.Genre, data.Rated, data.Released, reviews)
      movieInfo.innerHTML = makeMovieInfo(data.Plot)
    })
};

function makeGif(data) {
  return `<img id="insGif" src="${data}">`
}

function makeReviews(data) {
    for (var i = 0; i < data.Ratings.length; i++) {
      return (data.Ratings[i].Source, data.Ratings[i].Value)
    }
}

  function makeMoreInfo(director, actors, genre, rated, released, reviews) {
    return `<h5>Directed by: ${director}</h5>
  <h5>Actors: ${actors}</h5>
  <h5>Genre :${genre}</h5>
  <h5>Rated: ${rated}</h5>
  <h5>Year Released: ${released}</h5>
  <h5>Rated: ${reviews}</h5>`
}

  function makeMovieInfo(plot) {
    return `<h5 id='moreInfo'>${plot}</h5>`
  }


  movName.addEventListener('click', input => {
    console.log(input)
  })


  function searchMovie() {
    giphyCall();
    omdbCall();
  }