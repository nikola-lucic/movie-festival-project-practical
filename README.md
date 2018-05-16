# movie-festival-project-practical
movie-festival-project-practical


# Movie Form Practical

In bit-pp folder, create a new folder called movie-form. Prepare your folder for a new web project and add the following folders and file structure:
movie-form (your project folder)
css
main.css
js
entities.js
form.js
index.html

In index.html, create a basic html structure and connect you css and js files. When running in the browser, you should not see any errors from your page in the console.

To double check, when you add the console.log statement in entities.js and/or form.js file and reload the page, it should show the message from console.log in the browser console.

In index.html, create a structure similar to the one shown in the picture above (1 text input element, 1 number input element, one select element and one button). Create a button (input of type button). Make sure to assign a class or an id to each created element since we will need it to access elements from JavaScript.

Since it’s obvious that we will need to create a movie object, we will need to add Movie type in our JavaScript by creating Movie constructor function and getData method assigned to the Movie type, which returns the movie name, duration and the first and the last letter of genre as a formatted string like in the picture above. Create this function constructor in entities.js file (we already did this for the movie festival practical).

In your form.js file, create createMovie() function that should be triggered (executed) only when the user clicks on the green Create movie button. createMovie function should collect user input from the form inputs, create a Movie instance and create an html element that shows the content from that movie instance’s getData method below the button. If user inputs are empty, an error should be shown above the create movie button telling user what is missing.
