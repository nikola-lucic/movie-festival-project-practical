'use strict';

/**
 * Represent movie genre
 * @constructor
 * @param {string} genreName - The genre name 
 */
class Genre {
    constructor(genreName) {
        this.name = genreName;
    }

    getData() {
        const name = this.name;
        const firstIndex = 0;
        const lastIndex = name.length - 1
        const output = name.charAt(firstIndex) + name.charAt(lastIndex);

        return output.toUpperCase();
    }
}
/**
 * Represent a movie
 * @constructor
 * @param {string} title - The movie title
 * @param {Genre} genreObj - The Movie Genre object
 * @param {number} length - The movie length in minutes
 */

class Movie {
    constructor(title, genreObj, length) {
        this.title = title;
        this.genre = genreObj; // This is object
        this.length = length;
    }

    getData() {
        return `${this.title}, ${this.length}min, ${this.genre.getData()}`;
    }
}

/**
 * Represents a festival program
 * @constructor
 * @param {date} date - Date object
 */

class Program {
    constructor(date) {
        this.date = date;
        this.listOfMovies = [];
    }

    getProgramDuration() {
        let programLength = 0;

        // Alternative way to loop arrays
        this.listOfMovies.forEach(function(movie) {
            programLength += movie.length;
        }, this);

        return parseInt(programLength);
    }

    addMovie(movie) {
        this.listOfMovies.push(movie);
    }

    getData() {
        const date = new Date(this.date);
        const movies = this.listOfMovies;
        const programDuration = this.getProgramDuration();
        const dateStr = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

        if (!programDuration) {
            return `${dateStr}, program duration: TBA`;
        }

        return `${dateStr}, ${movies.length} movies, duration: ${programDuration} min`;
    }
}
/**
 * Represents movie festival
 * @constructor
 * @param {string} name - Festival name
 */

class Festival {
    constructor(name) {
            this.name = name;
            this.listOfPrograms = [];
        }
        /**
         * Adds program to the list of programs
         */
    addProgram(program) {
        this.listOfPrograms.push(program);
    }

    /**
     * Returns movie count in all programs
     * @returns {number}
     */
    getMoviesCount() {
        const programs = this.listOfPrograms;
        const moviesCount = 0;

        for (const i = 0; i < programs.length; i++) {
            const program = programs[i];
            moviesCount += program.listOfMovies.length;
        }

        return moviesCount;
    }

    /**
     * Returns formated string with all festival information
     * @returns {string}
     */
    getData() {
        const festivalName = this.name;
        const programs = this.listOfPrograms;
        const totalMovieCount = this.getMoviesCount();

        const outputStr = festivalName + " has " + totalMovieCount + " movie titles\n"

        for (const i = 0; i < programs.length; i++) {
            const program = programs[i];
            outputStr += "\t" + program.getData();
        }

        return outputStr;
    }
};