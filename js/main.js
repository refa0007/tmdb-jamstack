// Namespace
const MYAPP = {
    apikey: '06b5a2775e94f35b9ec5220ce0fa184d',
    today: new Date(),
    init: function(){
        
        //an initial function that we will call in our namespace
    },
    someMethod: function(){
        //some method belonging to our namespace
    }
}

document.addEventListener('DOMContentLoaded', MYAPP.init);


var URLsearch =`https://api.themoviedb.org/3/search/movie?&api_key=${MYAPP.apikey}&language=en-US&page=1&include_adult=false&query=`;
const imageSearch = "https://image.tmdb.org/t/p/w780";

const movieGrid = document.querySelector("#movie-grid");

const castGrid = document.querySelector("#cast-grid"); //aa


const media = document.getElementById('media');
  
media.addEventListener('change', handleChange);

var category;

function handleChange (ev) {
  ev.preventDefault();   
  category = ev.target.value;
  URLsearch =
  `https://api.themoviedb.org/3/search/${category}?&api_key=${MYAPP.apikey}&language=en-US&page=1&include_adult=false&query=`;
  return URLsearch;
}


const getMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    showMovies(data)
}


const showMovies = (data) => {
    movieGrid.innerHTML = "";
    data.results.forEach(
        (result) => {
            // console.log (result);
            let creditsId=result.id;
            const imageSource = result.poster_path === null ? "images/img1.jpg" : imageSearch + result.poster_path;
            const grid = document.createElement("div");
            grid.classList.add(`${creditsId}`);
            grid.classList.add("grid");
            
            grid.innerHTML = `
                <img class="${creditsId} " src="${imageSource}" alt="" />
                <div class="${creditsId} overlay">
                    <div class="${creditsId} title"> 
                    <h2 class="${creditsId} "> ${result.original_title}  </h2>
                    </div>
                    <h3 class="${creditsId} ">Overview:</h3>
                    <p class="${creditsId} overview"> 
                    ${result.overview}
                    </p>
                 </div>
            `
            movieGrid.appendChild(grid);

            let overview = document.querySelector(`.${CSS.escape(creditsId)}`)
            overview.addEventListener("click", getCredits)

        }
        )
    }

        // function to fetch the cast when click
        function getCredits (act){
            // console.log(act.target.className);
            let classIs= act.target.className;
            let classTrim= classIs.substring(0, classIs.indexOf(' '));
            // console.log(classTrim);
            let URLcredits= `https://api.themoviedb.org/3/movie/${classTrim}/credits?&api_key=06b5a2775e94f35b9ec5220ce0fa184d`;
            fetch(URLcredits)
            .then((response) => {
                 if (!response.ok) throw new Error('Data request failed');
                return response.json();
                 })
                .then((body) => {
                //  console.log(body);
                
                // castGrid.innerHTML = "";
                // window.location = '/credits.html'
                for (let i = 0; i < body.cast.length; i++) {
                // console.log(body.cast[i].original_name);
                const actorGrid = document.createElement("div");
                actorGrid.classList.add("actorGrid");
                actorGrid.innerHTML = `
                <div>${body.cast[i].original_name}</div>
                `
                // window.location = '/credits.html'
                // castGrid.appendChild(actorGrid);
                
                }
                
                // window.location = '/credits.html'
                })

                .catch((err) => {
                });
            }
                    


let btn = document.querySelector(".btn");
btn.addEventListener("click",clickFun);

function clickFun(){
    let search = document.getElementById("search");
    let val= search.value;
    // console.log (val);
    if (val != "") {

        let welcome = document.querySelector(".welcome");
        welcome.innerHTML = `Search results for "${val}"`;
        getMovies(URLsearch + val);
    } else {
        let welcome = document.querySelector(".welcome");
        welcome.innerHTML = 'Please enter a name';
        
    }
    
}
