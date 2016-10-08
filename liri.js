// @author: Thomas Thompson
// @github: tomtom28
// @comment: HW 10 (LIRI Node App)



// Link in Node Packages
var fs = require('fs'); // Included with Node.js --> Read/Write files
var request = require('request'); // https://www.npmjs.com/package/request --> API request client
var spotify = require('spotify'); // https://www.npmjs.com/package/spotify --> Spotify API client library
var Twitter = require('twitter'); // https://www.npmjs.com/package/twitter --> Twitter API client library



// Link in API Keys for Twitter
var apiKeys = require('./keys.js');



// Collect the User Command Tyoe
var commandType = process.argv[2];



// Switch case for the User Command Types
switch(commandType){

  // Case 1 - Twitter
  case 'my-tweets':
    callTwitter();
    break;


  // Case 2 - Spotify
  case 'spotify-this-song':
    callSpotify();
    break;


  // Case 3 - IMBD (Request)
  case 'movie-this':
    callMovieRequest();
    break;


  // Case 4 - FS Read
  case 'do-what-it-says':
    callWhatItSays();
    break;


  // Case 00 - Handle Invalid Entry
  default:
    console.log('Please pass in a valid LIRI command type...' + '\n' + 'Ex: "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says"');
}




// Twitter Function
function callTwitter(){
  console.log("Twitter");
}



// Spotify Function
function callSpotify(){
  console.log("Spotify");
}



// IMDB Request Function
function callMovieRequest(){
  console.log('IMBD');
}



// Bonus (Do What It Says) Function
function callWhatItSays(){
  console.log('FS Read');
}