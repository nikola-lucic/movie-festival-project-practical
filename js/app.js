"use strict";
var movies = [];
var festival = new Festival();

// Define actions
document.querySelector(".create-movie").addEventListener("click", function() {
    createMovie()
});

document.querySelector(".create-program").addEventListener("click", function() {
    createProgram();
});

document.querySelector(".add-movie").addEventListener("click", function() {
    addMovieToProgram();
});

function Movie(name, length, genre) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
    this.length = parseInt(length);
    this.genre = genre;
}

Movie.prototype.getData = function() {
    var firsLetter = this.genre.charAt(0).toUpperCase();
    var lastLetter = this.genre[this.genre.length - 1].toUpperCase();
    var letterMerge = firsLetter + lastLetter;
    return this.name + ", " + this.length + ".min" + ", " + this.genre + ", " + letterMerge;
}

function createMovie() {

    //movie input
    var titleInput = document.querySelector(".movie-title");
    var lengthInput = document.querySelector(".movie-length");
    var genreSelector = document.querySelector(".movie-genre");
    var moviesListElement = document.querySelector('.movie-list');
    var moviesSelectElement = document.querySelector(".movie-select");

    var title = titleInput.value.trim();
    var length = parseInt(lengthInput.value.trim());
    var genre = genreSelector.value.trim();

    //error input
    var MovieErrorElement = document.querySelector(".movie-error");

    //error isValid
    var isValid = title && length && genre;

    if (!isValid) {
        // Set error text to text context of error element
        MovieErrorElement.textContent = "All fields are required";

        // Exit if error happened
        return;
    }

    // Reset error just in case 
    MovieErrorElement.textContent = "";

    var movie = new Movie(title, length, genre);

    // Add movie to movies list
    movies.push(movie);

    var movieElement = document.createElement("li");
    var nodeText = movie.getData();
    var movieDateText = document.createTextNode(nodeText);
    movieElement.appendChild(movieDateText);
    var movieList = document.querySelector(".movie-list")
    movieList.appendChild(movieElement);

    //create drop down for movie select in program
    moviesSelectElement.value = 0;
    moviesSelectElement.options[moviesSelectElement.options.length] = new Option(movie.name, movies.length - 1);

    titleInput.value = "";
    lengthInput.value = "";
    genreSelector.selectedIndex = 0;
}

function Program(date) {
    this.date = date;
    this.listOfMovies = [];
}

Program.prototype.getProgramDuration = function() {
    var programLength = 0;

    this.listOfMovies.forEach(function (movie) {
        programLength += movie.length;
    }, this);

    return parseInt(programLength);
}

Program.prototype.addMovie = function (movie) {
    this.listOfMovies.push(movie);
};


Program.prototype.getData = function() {
    var date = new Date(this.date);
    var movies = this.listOfMovies;
    var programDuration = this.getProgramDuration();
    var dateString = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

    if (!programDuration) {
        return dateString + ", program duration: TBA";
    }
    return dateString + ", " + movies.length + " movies, duration: " + programDuration + "min"
}

Program.prototype.gatAllData = function() {
    var date = new Date(this.date);
    var movies = this.listOfMovies;
    var programDuration = this.getProgramDuration();
    var dateStr = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

    var outputString = dateStr + ", program duration " + programDuration + "min\n";
    movies.forEach(function(movie) {
        outputString += "\t\t" + movie.getData() + "\n";
    });

    return outputString;
}

function createProgram() {
    var dateElement = document.querySelector(".program-date");
    var programErrorElement = document.querySelector(".program-error");
    var programDate = dateElement.value;

    if (!programDate) {
        programErrorElement.textContent = "Please select date";
        return;
    }
    programErrorElement.textContent = "";

    var program = new Program(programDate);

    festival.addProgram(program);

    refreshMoviesAndProgramList()

    dateElement.value = "";
}

function addMovieToProgram() {
    var movieSelectElement = document.querySelector('.movie-select');
    var movieOptionElement = movieSelectElement.options[movieSelectElement.selectedIndex];

    var programSelectElement = document.querySelector('.program-select');
    var programOptionElement = programSelectElement.options[programSelectElement.selectedIndex];

    var assignErrorElement = document.querySelector('.assign-error');

    var movieIndex = movieOptionElement.value;
    var programIndex = programOptionElement.value;

    if (!movieIndex && !programIndex) {
        assignErrorElement.textContent = "Select program and movie";
        return;
    }

    errorElement.textContent = "";

    var selectedMovie = movies[movieIndex];
    var selectedProgram = festival.listOfPrograms[programIndex];

    selectedProgram.addMovie(selectedMovie);

    refreshMoviesAndProgramList();

    // Reset selectors to default position 
    movieSelectElement.selectedIndex = 0;
    programSelectElement.selectedIndex = 0;
}


function addMovieToProgram() {
    var movieSelectElement = document.querySelector('.movie-select');
    var movieOptionElement = movieSelectElement.options[movieSelectElement.selectedIndex];

    var programSelectElement = document.querySelector('.program-select');
    var programOptionElement = programSelectElement.options[programSelectElement.selectedIndex];

    var errorElement = document.querySelector('.assign-error');    

    var movieIndex = movieOptionElement.value;
    var programIndex = programOptionElement.value;

    if (!movieIndex && !programIndex) {
        errorElement.textContent = "Select program and movie";
        return;        
    }

    errorElement.textContent = "";

    var selectedMovie = movies[movieIndex];
    var selectedProgram = festival.listOfPrograms[programIndex];

    selectedProgram.addMovie(selectedMovie);

    refreshMoviesAndProgramList();

    // Reset selectors to default position 
    movieSelectElement.selectedIndex = 0;
    programSelectElement.selectedIndex = 0;
}


function refreshMoviesAndProgramList() {
    var programListElement = document.querySelector('.program-list');
    var programSelectElement = document.querySelector('.program-select');

 var programListHTML = "<ul>"
    var programSelectOptionsHTML = '<option value="">-</option>'

    var programList = festival.listOfPrograms;
    for (var i = 0; i < programList.length; i++) {
        var program = programList[i];
        programListHTML += "<li>" + program.getData() + "</li>";
        programSelectOptionsHTML += '<option value="' + i + '">' + program.getData() + '</option>'
    }

    programListHTML += "</ul>";

    programListElement.innerHTML = programListHTML;
    programSelectElement.innerHTML = programSelectOptionsHTML;
}

function Festival(name) {
    this.name = name;
    this.listOfPrograms = [];
};

/**
 * Adds program to the list of programs
 */
Festival.prototype.addProgram = function(program) {
    this.listOfPrograms.push(program);
};

/**
 * Returns movie count in all programs
 * @returns {number}
 */
Festival.prototype.getMoviesCount = function() {
    var programs = this.listOfPrograms;
    var moviesCount = 0;

    for (var i = 0; i < programs.length; i++) {
        var program = programs[i];
        moviesCount += program.listOfMovies.length;
    }

    return moviesCount;
};

/**
 * Returns formated string with all festival information
 * @returns {string}
 */
Festival.prototype.getData = function () {
    var festivalName = this.name;
    var programs = this.listOfPrograms;
    var totalMovieCount = this.getMoviesCount();

    var outputStr = festivalName + " has " + totalMovieCount + " movie titles\n"

    for (var i = 0; i < programs.length; i++) {
        var program = programs[i];
        outputStr += "\t" + program.getData();
    }

    return outputStr;
};
