var movName = 'spider';
var insGif = document.querySelector('#insGif')

var omdbAPI = '2b938382b69dedd54e33dfae5ada1214'
var giphAPI = 'nw35KvBZSmb4OKNw51Qur35t2fh1nqob'
var omdbURL = 'https://gateway.marvel.com/v1/public/characters?name=' + movName + '&apikey=' + omdbAPI
var giphURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + giphAPI + '&q=' + movName + '&limit=25&offset=0&rating=g&lang=en'






init();


function init() {
giphyCall();
}


function giphyCall() {
fetch(giphURL).then(function (response) {
  return response.json();
})
  .then(function (data) {
    var i = parseInt(Math.random() * data.data.length);
      console.log(data.data)
      gifResult = data.data[i].images.original.url;
      console.log(gifResult)

      insGif.setAttribute('src', gifResult)
  })
  
  

return omdbAPI.json 
};

function omdbCall() {

  fetch(giphURL).then(function (response) {
    return response.json();
  })
    .then(function (data) {
      for (var item of data.results) {
  
      }
    })
    
  
  return giphAPI.json
  };