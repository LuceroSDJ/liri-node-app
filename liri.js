//this line of code requires and configures dotenv module to read and set any environment variables
require("dotenv").config();

//===== 8. Add the code required to import the keys.js file and store it in a variable. ====
//keys.js file has my spotify id & secret which was grabbed from the process.env file, which was created 
//by adding ENVIRONMENT SPECIFIC VARIABLES to my .env file with the actual "id & secret" numbers (.env file is being gitnored)

var keys = require('./keys.js');  //our keys are available due to MODULARIZATION

console.log(keys);  //this will log the export object created in keys.js
//run node! I should see my keys in the console

// ==== it works as expected when I run node :) =====



//===============================
//===== spotify-this-song =======

var Spotify = require('node-spotify-api');  //here we required the package and stored it into a variable

//==now, I can access my keys information with the following line:
var spotify = new Spotify(keys.spotify);  // "new" calls in a regular function so "function Spotify()" must be a CONSTRUCTOR FUNCTION
console.log(spotify);

spotify.search({
//There are two methods available, search and 'request'
// "search is the EASIEST way to find an artist, album, or track"
// example => search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

})

/*Console Log the following information about the song in your terminal/bash window
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from */

// ========================================================
// ==== I need to send requests using the axios package ===
//example from documentation:
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });