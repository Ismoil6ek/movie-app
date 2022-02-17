// Keys connection
const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8';
const img_url = 'https://image.tmdb.org/t/p/w500';
const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=1cf50e6248dc270629e802686245c2c8';

// variables connection to html elements
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

// show cards calling function
getMovies(api_url);

// getting moives from given api
function getMovies(url) {
    url.this = url;
    fetch(url).then(res => res.json()).then(data => {

        // showing on console
        console.log("Data from given API :", data.results)

        // check if API working
        if (data.results.length !== 0) {
            showMovies(data.results);
        } else {
            main.innerHTML = `<h1 class="no-results">Nothing found in given API</h1>`
        }

    })
}

function showMovies(data) {
    // clear screen before showing new cards
    main.innerHTML = '';
    // main logic
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        // creating card
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${poster_path? img_url+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

                <h3 class="${getColor(vote_average)}">Overview</h3>
                ${overview}
            </div>
        `;
        // add cards to <main>
        main.appendChild(movieElement);
    })
}

// set colors for overview and score
function getColor(el) {
    if (el >= 8) {
        return 'green'
    } else if (el >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

// search
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // getting value from input
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    } else {
        getMovies(api_url);
    }

})

// When entering to page, active cursor on search
function setFocus() {
    document.getElementById("search").focus();
}

// Clear button (X)
window.addEventListener('load', () => {
    const button = document.querySelector('#clear');
    button.addEventListener('click', () => {
        document.querySelector('#search').value = "";
    });
});