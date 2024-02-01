function getPopularMovies(){
    let url = "https://api.themoviedb.org/3/movie/popular?api_key=b649fb851022fe7ce3f369a0c8c05292&language=en-US&page=1";

    let popularMovies = document.getElementById("popular");

    let imgUrl = "https://image.tmdb.org/t/p/w500/";

    const data = null;

    const xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
        // console.log(this.responseText);

        let json = JSON.parse(this.responseText);
        console.log(json);

        let html = "";
        for(let i = 0; i < 4; i++){
            html += `
                <figure>
                    <img src="${imgUrl}${json.results[i].poster_path}" alt="">
                    <figcaption>${json.results[i].title}</figcaption>
                </figure>
            `;
        }

        popularMovies.innerHTML = html;
    }
 });

    xhr.open('GET', url);
    xhr.setRequestHeader('accept', 'application/json');
    // xhr.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjQ5ZmI4NTEwMjJmZTdjZTNmMzY5YTBjOGMwNTI5MiIsInN1YiI6IjY1YmMxNmFiZDdjZDA2MDE0ODUzNTlhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cYAnMXEyFAxSp79SbpygCewXy3vlHTDGuJkTjXIUAuY');

    xhr.send(data);
}

function getBirthYearMovies(e){
    let year = encodeURI(document.getElementById("userYear"))

    let url = `https://api.themoviedb.org/3/discover/movie?api_key=b649fb851022fe7ce3f369a0c8c05292&primary_release_year=${year}&sort_by=revenue.desc&language=en-US&page=1&include_adult=false`;

    let birthMovies = document.getElementById("birthYear");
    let imgUrl = "https://image.tmdb.org/t/p/w500/";

    const data = null;

    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            // console.log(this.responseText);
    
            let json = JSON.parse(this.responseText);
            console.log(json);
    
            let html = "";
            for(let i = 0; i < 4; i++){
                html += `
                    <figure>
                        <img src="${imgUrl}${json.results[i].poster_path}" alt="">
                        <figcaption>${json.results[i].title}</figcaption>
                    </figure>
                `;
            }
    
            birthMovies.innerHTML = html;
        }
     });

     xhr.open('GET', url);
     xhr.setRequestHeader('accept', 'application/json');
     xhr.send(data);
}



window.addEventListener("load", function(){
	getPopularMovies();
	document.getElementById("yearBtn").addEventListener("click", getBirthYearMovies);
});
