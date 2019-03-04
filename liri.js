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
          randomCommand();
          break;
      }
    })
};
//call function to display questions
commandLiri();

var axios = require('axios');
 //require moment.js
 var moment = require('moment');

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
      //create variable to add Date of the Event (use moment to format this as "MM/DD/YYYY")
        var concertDate = response.data[0].venue.datetime;
        //template literals
        var showConcertInfo = `
        NAME OF THE VENUE: ${response.data[0].venue.name}
        VENUE LOCATION: ${response.data[0].venue.city}
        VENUE LOCATION: ${response.data[0].venue.country}
        TODAY\'S DATE: ${response.headers.date}
        CONCERT\'S DATE: ${moment(concertDate).format("MM/DD/YY")}
        `;
        console.log(showConcertInfo);
      })
      .catch(function (error) {
        console.log(error);
      }); 
    } else{
      console.log('Please add a band');
    }
  });
};
 // ===============================================
//send requests to OMDB API using the axios package 
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
    //construct urlQuery
    var OMDBapi = 'https://www.omdbapi.com/?t=' + concertInfo.userRequest + '&apikey=trilogy';
    axios
      .get(OMDBapi)
      .then(function(response) {
        //console.log(response.data);
        /*
        output the following information to your terminal/bash window:
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie. */
        var showMovieInfo = `
        Title of the movie: ${response.data.Title}
        Year: ${response.data.Year}
        IMDB Rating: ${response.data.Ratings[0].Value}
        Rotten Tomatoes Raiting: ${response.data.Ratings[1].Value}
        Country: ${response.data.Country}
        Language: ${response.data.Language}
        Plot: ${response.data.Plot}
        Actors: ${response.data.Actors}
        `
        console.log(showMovieInfo);
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }else {
      var OMDBapi = 'https://www.omdbapi.com/?t=mr+nobody&apikey=trilogy';
      axios
        .get(OMDBapi)
        .then(function(response) {
          var showDefaultMovie = `
          Title of the movie: ${response.data.Title}
          Year: ${response.data.Year}
          IMDB Rating: ${response.data.Ratings[0].Value}
          Rotten Tomatoes Raiting: ${response.data.Ratings[1].Value}
          Country: ${response.data.Country}
          Language: ${response.data.Language}
          Plot: ${response.data.Plot}
          Actors: ${response.data.Actors}
          `
          console.log(showDefaultMovie);
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

//==now, keys information can be accessed with the following line: ==
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
          var showSongInfo = `
          ARTIST/BAND: ${response.tracks.items[0].artists[0].name}
          SONG\'S NAME: ${response.tracks.items[0].name}
          ALBUM: ${response.tracks.items[0].album.name}
          LINK: ${response.tracks.items[0].external_urls.spotify}
          `
          console.log(showSongInfo);
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
          var showDefaultSong = `
          ARTIST/BAND: ${response.tracks.items[0].artists[0].name}
          SONG\'S NAME: ${response.tracks.items[0].name}
          ALBUM: ${response.tracks.items[0].album.name}
          LINK: ${response.tracks.items[0].external_urls.spotify}
          `
          console.log(showDefaultSong);
        })
      }
    })
  }
//Console log the command and the name of the song & read random.txt 
var fs = require("fs");

function randomCommand() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if(err) {
      return console.log(err);
    }
    var data = data.split(",");
    var commandArg = data[0];
    var songArg = data[1];
    console.log(data[0]);
    console.log(data[1]);
    //console.log(data);
    //make search request to spotify API by reading var songArg
    spotify.search({
      type: 'track', 
      query: songArg, 
      limit: 1 
      }).then(function(response) {
        var readSongFile = `
          ARTIST/BAND: ${response.tracks.items[0].artists[0].name}
          SONG\'S NAME: ${response.tracks.items[0].name}
          ALBUM: ${response.tracks.items[0].album.name}
          LINK: ${response.tracks.items[0].external_urls.spotify}
          `                               
          console.log(readSongFile);
        })
        .catch(function(err) {
          console.log(err);
        })
    })
  }