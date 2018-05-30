const movies = [];
const festival = new Festival();

// Define actions
document.querySelector(".create-movie").addEventListener("click", () => {
    createMovie()
});

document.querySelector(".create-program").addEventListener("click", () => {
    createProgram();
});

document.querySelector(".add-movie").addEventListener("click", () => {
    addMovieToProgram();
});

// Functions that to the actual work
const createMovie = () => {
    const titleElement = document.querySelector('.movie-title');
    const lengthElement = document.querySelector('.movie-length');
    const genreSelectElement = document.querySelector('.genre-select');
    const genreOptionElement = genreSelectElement.options[genreSelectElement.selectedIndex]
    const errorElement = document.querySelector('.movie-error');
    const moviesElement = document.querySelector('.movie-list');
    const moviesSelectElement = document.querySelector('.movie-select');

    const title = titleElement.value.trim();
    const length = parseInt(lengthElement.value.trim());
    const genre = genreOptionElement.value.trim();

    const isValid = title && length && genre;

    // Validate if all three fields are valid to continue
    if (!isValid) {
        // Set error text to text context of error element
        errorElement.textContent = "All fields are required";

        // Exit if error happened
        return;
    }

    // Create objects using constructors
    const genreObj = new Genre(genre);
    const movie = new Movie(title, genreObj, length);

    // Add movie to movies list
    movies.push(movie);

    let movieListHTML = `<ul>`;
    let moviesSelectOptionsHTML = `<option value="none">-</option>`

    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        movieListHTML += `<li>${movie.getData()}</li>`
        moviesSelectOptionsHTML += `<option value="${i}">${movie.title}</option>`
    }

    movieListHTML += `</ul>`

    moviesElement.innerHTML = movieListHTML;
    moviesSelectElement.innerHTML = moviesSelectOptionsHTML;

    titleElement.value = "";
    lengthElement.value = "";
    genreSelectElement.selectedIndex = 0;
}

const createProgram = () => {
    const dateElement = document.querySelector('.program-date');
    const errorElement = document.querySelector('.program-error');
    const programDate = dateElement.value;

    if (!programDate) {
        errorElement.textContent = "Please select date"
        return;
    }

    errorElement.textContent = ""

    const program = new Program(programDate);

    festival.addProgram(program);

    refreshMoviesAndProgramList()

    dateElement.value = "";
}

const addMovieToProgram = () => {
    const movieSelectElement = document.querySelector('.movie-select');
    const movieOptionElement = movieSelectElement.options[movieSelectElement.selectedIndex];

    const programSelectElement = document.querySelector('.program-select');
    const programOptionElement = programSelectElement.options[programSelectElement.selectedIndex];

    const errorElement = document.querySelector('.assign-error');

    const movieIndex = movieOptionElement.value;
    const programIndex = programOptionElement.value;

    if (!movieIndex && !programIndex) {
        errorElement.textContent = "Select program and movie";
        return;
    }

    errorElement.textContent = "";

    const selectedMovie = movies[movieIndex];
    const selectedProgram = festival.listOfPrograms[programIndex];

    selectedProgram.addMovie(selectedMovie);

    refreshMoviesAndProgramList();

    // Reset selectors to default position 
    movieSelectElement.selectedIndex = 0;
    programSelectElement.selectedIndex = 0;
}


const refreshMoviesAndProgramList = () => {
    const programListElement = document.querySelector('.program-list');
    const programSelectElement = document.querySelector('.program-select');

    let programListHTML = `<ul>`
    let programSelectOptionsHTML = `<option value="">-</option>`

    let programList = festival.listOfPrograms;
    for (let i = 0; i < programList.length; i++) {
        let program = programList[i];
        programListHTML += `<li>${program.getData()}</li>`;
        programSelectOptionsHTML += `<option value="${i}">'${program.getData()}'</option>`
    }

    programListHTML += `</ul>`;

    programListElement.innerHTML = programListHTML;
    programSelectElement.innerHTML = programSelectOptionsHTML;
}