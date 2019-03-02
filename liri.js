//this line of code requires and configures dotenv module to read and set any environment variables
require("dotenv").config();

//===== 8. Add the code required to import the keys.js file and store it in a variable. ====
//keys.js file has my spotify id & secret which was grabbed from the process.env file, which was created 
//by adding ENVIRONMENT SPECIFIC VARIABLES to my .env file with the actual "id & secret" numbers (.env file is being gitnored)

var keys = require('./keys.js');  //our keys are available due to MODULARIZATION

// console.log(keys);  //this will log the export object created in keys.js
//run node! I should see my keys in the console
// ==== it works as expected when I run node :) =====


//======================================================
//===== create code to take user's input ======
//liri.js must take in one of the following commands:
//  concert-this
//  spotify-this-song
//  movie-this
//  do-what-it-says

// Load the NPM Package inquirer
var inquirer = require("inquirer");

function commandLiri() {
  inquirer
    .prompt([
      {
      //create text prompt
      type: 'list',
      name: 'liriCommand',
      message: 'Hi, my name is Liri! What can I help you with?',
      choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
      },
    ]).then(function(userSelection) {
      var liriCommand = userSelection.liriCommand;
      switch(liriCommand) {
        case 'concert-this':
          concertRequest();
          break;
        case 'spotify-this-song':
          songQuestion();
          break;
        case 'movie-this':
          movieRequest();
          break;
        case 'do-what-it-says':
          readText();
          break;
      }
    })
};
//call function to display questions
commandLiri();

var axios = require('axios');

 // Store all of the arguments in an array
 var userArgs = process.argv;
 //empty variable will hold the name of the song requested by the user
 var userRequest = '';
 //loop through all the node arguments added by the user
 for(var i = 2; i <  userArgs.length; i++) {
    if(i > 2 && i < userArgs.length) {
        userArgs = userArgs + '+' + userRequest[i];
    } 
    else {
        userArgs += userArgs[i];
    }
  }


  // ===================================
  //send requests to Bands in Town API using the axios package 
  //function concertRequest() {
    //console.log('hello');
  //}
  function concertRequest() {
    inquirer
    .prompt([
      {
        type: 'input',
        message: 'Search for a concert: ',
        name: 'userRequest'  
      }
    ]).then(function(concertInfo) {
  //construct urlQuery
  //add default value
  //var query = concertInfo.userRequest || 'The Sign';
  if(concertInfo.userRequest) {
    var bandsInTownArtistEvents = "https://rest.bandsintown.com/artists/" + concertInfo.userRequest + "/events?app_id=codingbootcamp";
    axios
      .get(bandsInTownArtistEvents)
      .then(function(response){
        console.log(response.data);
        console.log('NAME OF THE VENUE: ' + response.data[0].venue.name);
        console.log('VENUE LOCATION: ' + response.data[0].venue.city);
        console.log('VENUE LOCATION: ' + response.data[0].venue.country);
        console.log('TODAY\'S DATE: ' + response.headers.date)
        console.log('CONCERT\'S DATE: ' + response.data[0].venue.datetime)
      })
      .catch(function (error) {
        console.log(error);
      }); 
    } else{
      console.log('Please add a band');
    }
  });
};
 // ===================================
  //send requests to OMDB API using the axios package 
  //output the following information to your terminal/bash window:
  //* Title of the movie.
  //* Year the movie came out.
  //* IMDB Rating of the movie.
  //* Rotten Tomatoes Rating of the movie.
  //* Country where the movie was produced.
  //* Language of the movie.
  //* Plot of the movie.
  //* Actors in the movie.

function movieRequest() {
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'Search for a movie: ',
      name: 'userRequest'
    }
  ]).then(function(concertInfo) {
    if(concertInfo.userRequest) {
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    //add if/else statement. If left empty default to given movie
    //if(concertInfo.userRequest) {}
    //construct urlQuery
    var OMDBapi = 'https://www.omdbapi.com/?t=' + concertInfo.userRequest + '&apikey=trilogy';
    axios
      .get(OMDBapi)
      .then(function(response) {
        console.log(response.data);
        /*
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie. */
        console.log('Title of the movie: ' + response.data.Title);
        console.log('Year: ' + response.data.Year);
        console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
        console.log('Rotten Tomatoes Raiting: ' + response.data.Ratings[1].Value);
        console.log('Country: ' + response.data.Country);
        console.log('Language: ' + response.data.Language);
        console.log('Plot: ' + response.data.Plot);
        console.log('Actors: ' + response.data.Actors);
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else {
      var OMDBapi = 'https://www.omdbapi.com/?t=mr+nobody&apikey=trilogy';
      axios
        .get(OMDBapi)
        .then(function(response) {
          console.log(response.data);
          console.log('Title of the movie: ' + response.data.Title);
          console.log('Year: ' + response.data.Year);
          console.log('IMDB Rating: ' + response.data.Ratings[0].Value);
          console.log('Rotten Tomatoes Raiting: ' + response.data.Ratings[1].Value);
          console.log('Country: ' + response.data.Country);
          console.log('Language: ' + response.data.Language);
          console.log('Plot: ' + response.data.Plot);
          console.log('Actors: ' + response.data.Actors);
        })
        .catch(function (error) {
          console.log(error);
        }); 
      } 
  });
};

//===============================
//===== spotify-this-song =======

var Spotify = require('node-spotify-api');  //here we required the package and stored it into a variable

//==now, keys information can be accessed with the following line:
var spotify = new Spotify(keys.spotify);  // "new" calls in a regular function so "function Spotify()" must be a CONSTRUCTOR FUNCTION
//console.log(spotify);


function songQuestion() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What song is in your mind right now?',
        name: "songsName"
      }
    ]).then(function(songInfo) {
      if(songInfo.songsName) {
      //There are two methods available, search and 'request'
      // "search is the EASIEST way to find an artist, album, or track"
      // example => search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
      //documentation: "Note: The limit property is optional and the search will default to 20 if one is not supplied."
      //documentation: "This package also optionally works with promises. Just omit the callback parameter and the search method returns a promise object containing the response:"
        spotify.search({
        type: 'track', 
        query: songInfo.songsName, 
        limit: 1 
        }).then(function(response) {
        /*Console Log the following information about the song in your terminal/bash window
          Artist(s)
          The song's name
          A preview link of the song from Spotify
          The album that the song is from */
          //console.log(response.tracks.href.items.artists.external_urls.name);
          //console.log(response.tracks.items.album.external_urls.spotify);
          //console.log(response);
          console.log('ARTIST/BAND: ' + response.tracks.items[0].artists[0].name);
          console.log('SONG\'S NAME: ' + response.tracks.items[0].name);
          console.log('ALBUM: ' + response.tracks.items[0].album.name);
          console.log('LINK: ' + response.tracks.items[0].external_urls.spotify);
        })
        .catch(function(err) {
          console.log(err);
        })
      }else {
        spotify.search({
        type: 'track', 
        query: 'The Sign', 
        limit: 1 
        }).then(function(response) {
          console.log('ARTIST/BAND: ' + response.tracks.items[0].artists[0].name);
          console.log('SONG\'S NAME: ' + response.tracks.items[0].name);
          console.log('ALBUM: ' + response.tracks.items[0].album.name);
          console.log('LINK: ' + response.tracks.items[0].external_urls.spotify);
        })
      }
    });
    
function readText() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if(err) {
      return console.log(err);
    }
    console.log(data);
    var data = data.split(",");
    console.log(data);
  })
}

// ========================================================
// ==== I need to send requests using the axios package ===
//grab axios package & store it into a variable:
//                                  var axios = require('axios');
///////////////////////+
/*
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
  }); */
}