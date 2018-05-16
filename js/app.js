var movies = [];

function Movie(name, length,genre){
    this.name= name.charAt(0).toUpperCase()+name.slice(1);
    this.length = parseInt(length);
    this.genre= genre;
}

Movie.prototype.getData = function(){
    var firsLetter = this.genre.charAt(0).toUpperCase();
    var lastLetter = this.genre[this.genre.length-1].toUpperCase();
    var letterMerge= firsLetter+lastLetter;
    return this.name +", " + this.length + ".min" + ", " + this.genre + ", " + letterMerge;
}

function addMovie(){
    
    //movie input
    var titleInput = document.querySelector(".movie-title");
    var lengthInput = document.querySelector(".movie-length");
    var genreSelector= document.querySelector(".movie-genre");
    
    var title = titleInput.value.trim();
    var length = parseInt(lengthInput.value.trim());
    var genre = genreSelector.value.trim();

    //movie list input
    var moviesListElement = document.querySelector('.movie-list');

    //error input
    var error = document.querySelector(".error");

    //error isValid
    var isValid = title && length && genre;

    if (!isValid) {
        // Set error text to text context of error element
        error.textContent = "All fields are required";

        // Exit if error happened
        return;
    }

    // Reset error just in case 
    error.textContent = "";

    var movie = new Movie (title, length, genre);

    // Add movie to movies list
    movies.push(movie);

    var movieElement = document.createElement("li");
    var nodeText = movie.getData();
    var movieDateText = document.createTextNode(nodeText);
    movieElement.appendChild(movieDateText);
    var movieList = document.querySelector(".movie-list")
    movieList.appendChild(movieElement);
}





