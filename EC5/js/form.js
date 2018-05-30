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

// Functions that to the actual work
function createMovie() {
    var titleElement = document.querySelector('.movie-title');
    var lengthElement = document.querySelector('.movie-length');
    var genreSelectElement = document.querySelector('.genre-select');
    var genreOptionElement = genreSelectElement.options[genreSelectElement.selectedIndex]
    var errorElement = document.querySelector('.movie-error');
    var moviesElement = document.querySelector('.movie-list');
    var moviesSelectElement = document.querySelector('.movie-select');

    var title = titleElement.value.trim();
    var length = parseInt(lengthElement.value.trim());
    var genre = genreOptionElement.value.trim();

    var isValid = title && length && genre;

    // Validate if all three fields are valid to continue
    if (!isValid) {
        // Set error text to text context of error element
        errorElement.textContent = "All fields are required";

        // Exit if error happened
        return;
    }

    // Create objects using constructors
    var genreObj = new Genre(genre);
    var movie = new Movie(title, genreObj, length);

    // Add movie to movies list
    movies.push(movie);

    var movieListHTML = "<ul>";
    var moviesSelectOptionsHTML = '<option value="none">-</option>'

    for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        movieListHTML += "<li>" + movie.getData() + "</li>"
        moviesSelectOptionsHTML += '<option value="' + i + '">' + movie.title + '</option>'
    }

    movieListHTML += "</ul>"

    moviesElement.innerHTML = movieListHTML;
    moviesSelectElement.innerHTML = moviesSelectOptionsHTML;

    titleElement.value = "";
    lengthElement.value = "";
    genreSelectElement.selectedIndex = 0;
}

function createProgram() {
    var dateElement = document.querySelector('.program-date');
    var errorElement = document.querySelector('.program-error');
    var programDate = dateElement.value;

    if (!programDate) {
        errorElement.textContent = "Please select date"
        return;
    }

    errorElement.textContent = ""

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