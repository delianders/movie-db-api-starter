// this function will be called on page load to add the current top four movies to the top of the page
function getPopularMovies() {
	// the url endpoint, including the API key as a parameter
   let url = "https://api.themoviedb.org/3/movie/popular?region=US&api_key=6103f928103518e6b9b7a0280f0f9a28";
   // the location on the page to display the movies
   let popularMovies = document.getElementById("popular");
   // the start of the url needed to load images
   let imgUrl = "https://image.tmdb.org/t/p/w400/";

   // the Ajax
   // 1. Create the Ajax object
   let xhr = new XMLHttpRequest();

   // 2. add necessary event listeners
   xhr.addEventListener("readystatechange", function(){
		// when a successful response is received, handle it
   		if (this.readyState === this.DONE && this.status == 200) {
			// log returned data to the console to check it
			console.log(this.response);

			// storing the response in a variable for easier access
   			let json = this.response;

			// an empty string to build our output
	   		let html = "";

			// display the first four movies returned to the page
			for(let i = 0; i < 4; i++){
				// add each poster to a figure and use its title as the figcaption
				html += `
				<figure>
					<img src="${imgUrl}${json.results[i].poster_path}">
					<figcaption>${json.results[i].title}</figcaption>
				</figure>`; 
			}
			// add the output string to the page element saved above
	      	popularMovies.innerHTML = html;
	    } else {
			// handle a non-successful response
	      popularMovies.innerHTML = "There was a problem with the movie database";
	    }
   });

   // set the expected response type from the API
   xhr.responseType = "json";

   // 3. open the request using a GET and the url from above
   xhr.open("GET", url);

   // 4. (optional, depends on API) Set any necessary headers on the response

   // 5. send the request
   xhr.send();
}

// this function will be called when the user clicks to submit the form with a year selected and will display the top four movies from that year
function getBirthYearMovies(e){
	// this is called from a form, so we prevent default submission first
	e.preventDefault();

	// get the user's selected year from the form and encode it for use in the call
	let year = encodeURI(document.getElementById("userYear").value);

	// the location on the page where these movies will be displayed
	let birthYearMovies = document.getElementById("birthYear");

	// get the current year to use in validation
	let now = new Date().getFullYear();

	// basic form validation first, the year needs to be between 1940 and the current year
	if(year < 1940 || year > now){
		birthYearMovies.innerHTML = `
		<p style="color:red;background-color:white;">Please enter a year between 1940 and 2021</p>`;
	}else{
		// when the year is valid, we can call the API
		// the endpoint needs to be built to include the API key and the year from the user
		// the start of our endpoint
		let beginUrl = "https://api.themoviedb.org/3/discover/movie?api_key=6103f928103518e6b9b7a0280f0f9a28&primary_release_year=";
		// the end of our endpoint with parameters to limit results
		let endUrl = "&sort_by=revenue.desc&language=en-US&page=1&include_adult=false&with_original_language=en";
		// the full url built from our parts
		let url = `${beginUrl}${year}${endUrl}`;
		// the start of the image url needed to display the posters
		let imgUrl = "https://image.tmdb.org/t/p/w400/";
		
		// 1. create the Ajax object
		let xhr = new XMLHttpRequest();

		// 2. add event listeners
		xhr.addEventListener("readystatechange", function(){
			// when the call to the API is complete and successful, handle the display of the movies
			if (this.readyState === this.DONE && this.status == 200) {
				// log returned data to the console to check it
				console.log(this.response);

				// storing the response in a variable for easier access
				let json = this.response;

				// an empty string to build output
				let html = "";

				// display the first four movies returned to the page
				for(let i = 0; i < 4; i++){
					// we will display a message with the title if there is no poster image
					if(json.results[i].poster_path === null){
						html += `
						<p>
						There is no poster image for this film.
						<br>
						<span>${json.results[i].title}</span>
						</p>`;
					}else{
						// if there is a poster, display it like the movies at the top of the page
						html += `
							<figure>
								<img src="${imgUrl}${json.results[i].poster_path}">
								<figcaption>${json.results[i].title}</figcaption>
							</figure>`; 
					}
				}
				// either way, add our HTML string to the page in the right location
				birthYearMovies.innerHTML = html;
			} else {
				// if there is an error with the call, display an error message
				birthYearMovies.innerHTML = "There was a problem with the movie database";
			}
		});

		// setting the expected response return type
		xhr.responseType = "json";
		// 3. open the connection using a GET call to the url built above
		xhr.open("GET", url);

		// 4. (optional, depends on API) Set any necessary headers on the response

		// 5. send the call
		xhr.send();
	}
}


// called on page load, will call the function to display the movies at the top of the page, update the year in the footer, and add an event listener to the button allowing the user to search movies by year
window.addEventListener("load", function(){
	getPopularMovies();
	document.getElementById("yearBtn").addEventListener("click", getBirthYearMovies);

	// this iife updates the copyright year in the footer
	(function(){
		let now = new Date();
		let span = document.querySelector("footer span");
		span.innerHTML = now.getFullYear();
	})();

});