'use strict';

/**
 * Represent movie genre
 * @constructor
 * @param {string} genreName - The genre name 
 */
function Genre(genreName) {
    // properties
    this.name = genreName;
}

// methods
Genre.prototype.getData = function() {
    var name = this.name;
    var firstIndex = 0;
    var lastIndex = name.length - 1
    var output = name.charAt(firstIndex) + name.charAt(lastIndex);

    return output.toUpperCase();
};

/**
 * Represent a movie
 * @constructor
 * @param {string} title - The movie title
 * @param {Genre} genreObj - The Movie Genre object
 * @param {number} length - The movie length in minutes
 */
function Movie(title, genreObj, length) {
    // properties
    this.title = title;
    this.genre = genreObj; // This is object
    this.length = length;

}

// methods
Movie.prototype.getData = function() {
    return this.title + ", " + this.length + "min, " + this.genre.getData();
};

/**
 * Represents a festival program
 * @constructor
 * @param {date} date - Date object
 */
function Program(date) {
    // properties
    this.date = date;
    this.listOfMovies = [];
}

// methods
Program.prototype.getProgramDuration = function() {
    var programLength = 0;

    // Alternative way to loop arrays
    this.listOfMovies.forEach(function(movie) {
        programLength += movie.length;
    }, this);

    return parseInt(programLength);
};

Program.prototype.addMovie = function(movie) {
    this.listOfMovies.push(movie);
};

Program.prototype.getData = function() {
    var date = new Date(this.date);
    var movies = this.listOfMovies;
    var programDuration = this.getProgramDuration();
    var dateStr = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

    if (!programDuration) {
        return dateStr + ", program duration: TBA";
    }

    return dateStr + ", " + movies.length + " movies, duration: " + programDuration + "min";
};

Program.prototype.getAllData = function() {
    var date = new Date(this.date);
    var movies = this.listOfMovies;
    var programDuration = this.getProgramDuration();
    var dateStr = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

    var outputStr = dateStr + ", program duration " + programDuration + "min\n";

    for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        outputStr += "\t\t" + movie.getData() + "\n";
    }

    return outputStr;
};

/**
 * Represents movie festival
 * @constructor
 * @param {string} name - Festival name
 */
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
Festival.prototype.getData = function() {
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

/**
 * Main function
 */
function runInConsole() {

    /**
     * Returns the created Movie
     * @param {string} mTitle - The movie title
     * @param {number} mLength - The movie length in minutes
     * @param {string} genreName - The genre name
     */
    function createMovie(mTitle, mLength, genreName) {
        var genreObj = new Genre(genreName);
        // var movie = new Movie(movieTitle, new Genre(genreName), mLength);
        var movie = new Movie(mTitle, genreObj, mLength);

        return movie;
    }

    /**
     * Returns created program for a given date
     * @param {string} dateStr - String representing date
     */
    function createProgram(dateStr) {
        var date = new Date(dateStr);
        var program = new Program(date)
        return program;
    }

    // Create movies
    var spiderman = createMovie("Spider-Man: Homecoming", 133, "Action");
    var planetApes = createMovie("War for the Planet of the Apes", 140, "Drama");
    var darkTower = createMovie("The Dark Towe", 95, "Western");
    var deadpool = createMovie("Deadpool", 108, "Comedy");

    // Create programs
    var actionProgram = createProgram("Oct 28 2017");
    var comedyProgram = createProgram("Oct 29 2017");

    // Add action movies to action program
    actionProgram.addMovie(spiderman);
    actionProgram.addMovie(planetApes);
    actionProgram.addMovie(darkTower);

    // Add comedy movies to comedy program
    comedyProgram.addMovie(deadpool);

    // Create festival
    var weekendFestival = new Festival("Weekend festival");

    // Add programs to the festival 
    weekendFestival.addProgram(actionProgram);
    weekendFestival.addProgram(comedyProgram);

    // Output festival data 
    console.log(weekendFestival.getData());

};