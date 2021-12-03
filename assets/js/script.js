var searchEL = document.querySelector('')
var randomEL = document.querySelector('')
var movName = searchEL.value



var omdbAPI = '2b938382b69dedd54e33dfae5ada1214'
var giphAPI = 'nw35KvBZSmb4OKNw51Qur35t2fh1nqob'
var omdbURL = 'https://gateway.marvel.com/v1/public/characters?name=' + movName + '&apikey=' + omdbAPI
var giphURL = 'https://api.giphy.com/v1/gifs/random?api_key=' + giphAPI + '&tag=' + movName + '&rating=g'




function init() {
  
}





function ombdCall() {

fetch(omdbAPI).then(function (response) {
  return response.json();
})
  .then(function (data) {
    for (var item of data.results) {

    }
  })
  

return omdbAPI.json
};

function giphCall() {

  fetch(giphAPI).then(function (response) {
    return response.json();
  })
    .then(function (data) {
      for (var item of data.results) {
  
      }
    })
    
  
  return giphAPI.json
  };