# liri-node-app
Hello! My name is LIRI. I am iPhone's SIRI's cousin.
"LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data."

## LIRI HAS BEEN LINKED TO MY PORTFOLIO
* [Please visit my porfolio page](https://lucerosdj.github.io/Portfolio/)

## GOAL
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies!

### TECHNOLOGIES
* JavaScript
* node.js

### APIs
* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [OMDB API](http://www.omdbapi.com)

### MODULES
* axios
* dotenv
* inquirer
* node-spotify-api
* moment 

### USER COMMANDS
Liri.js can take in one of the following commands which will be provided as a list from where user can choose from:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### FUNCTIONALITY
1. `node liri.js concert-this`
  * This command will ask the user to request an artist.  `<artist/band name>`
  * Based on user's input, liri.js will make a call to Bands In Town API and render the following information about each event to the terminal: 
     ```
       * Name of the venue
       * Venue location
       * Today's Date
       * Date of the Event (use moment to format this as "MM/DD/YYYY")
     ```
  * If no song is provided then your program will default to "The Sign" by Ace of Base.
  * [Demo Video](https://drive.google.com/file/d/1rc5ge1I7WDO-IIzjc67BziwauUD7LC11/view)

2. `node liri.js spotify-this-song`
  * This command will ask the user to request an artist.   `<song name>`
  * Based on user's input, liri.js will make a call to Node-Spotify-API and render the following information about each song to the terminal: 
     ```
       * Artist(s)
       * The song's name
       * A preview link of the song from Spotify
       * The album that the song is from
     ```
  * If no song is provided then your program will default to "The Sign" by Ace of Base.
  * [Demo Video](https://drive.google.com/file/d/1reqm3-Oe9DoAAg-GB6gT4qfzhSwuPUSM/view)
  
  3. `node liri.js movie-this`
  * This command will ask the user to request an movie.   `<movie name>`
  * Based on user's input, liri.js will make a call to OMDB API and render the following information about each movie to the terminal:
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
   * [Demo Video](https://drive.google.com/file/d/1ezLKXv2ZKTbWOiS9Sd_5JrzLsZuD4osO/view)

  4. `node liri.js do-what-it-says`
  * Using the `fs` Node package, LIRI will read & take the text inside of random.txt and run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
  * [Demo Video](https://drive.google.com/file/d/12SuDnBWZdeI8SUkPVl-VT4CC94wgL6z6/view)
   
### Image: API response data displayed in the terminal
![lirifunctionality](https://user-images.githubusercontent.com/44692872/53691015-53cfc180-3d3b-11e9-8a4a-556228e27432.png)
![dowhatitsays](https://user-images.githubusercontent.com/44692872/53757816-483ae280-3e82-11e9-9baa-58ea01b1baaa.png)

  
   
