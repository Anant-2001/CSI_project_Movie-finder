const APIKEY = '37e9ad1e1ddc78f6697a8eaaa9716990';
const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=37e9ad1e1ddc78f6697a8eaaa9716990';
var IMGPATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=37e9ad1e1ddc78f6697a8eaaa9716990&query=';

const main = document.querySelector('main');
const form = document.querySelector("#form")
const search = document.querySelector(".search");

getMovies(APIURL);

async function getMovies(URL){
  const resp = await fetch(URL);
  const respData = await resp.json()
  console.log(respData);
  
  displayMovies(respData.results);
}

function displayMovies(movies){
  main.innerHTML = '';
  movies.forEach(movie => {
    IMGPATH = 'https://image.tmdb.org/t/p/w500';
    const movieElement = document.createElement('div');
    movieElement.classList.add("movie");

    if(movie.poster_path == null){
      IMGPATH = "https://images.unsplash.com/";
      movie.poster_path = "photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=450&q=60"
    }

    movieElement.innerHTML = 
    ` 
    <img  src=" ${IMGPATH + movie.poster_path} " alt= "${movie.title}"/>
    <div class="movie-info">
      <h3>${movie.title}</h3>
      <span>${movie.vote_average}</span>
    </div>
    <div class = "overview"> 
    <h4> Overview:  </h4>
    ${movie.overview}
    </div>
   `

    main.appendChild(movieElement);
  });

}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchMovie = search.value;

  if(searchMovie){
    getMovies(SEARCHAPI + searchMovie);
    search.value = "";
  }
  
} )